const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Question = require("../model/question");
const { userMiddleware } = require("../middleware/userMiddleware");
const {
  singleQuestion,
  requestHint,
} = require("../controllers/questionController");
const { EVENT_END } = require("../config/eventTime");

router.get("/:id", userMiddleware, singleQuestion);
router.post("/request-hint", userMiddleware, requestHint);
router.post("/submit-flag", userMiddleware, async (req, res) => {
  try {
    const now = new Date();
    if (now > EVENT_END) {
      return res
        .status(403)
        .json({ success: false, message: "Event has ended!" });
    }

    const { questionId, submittedFlag } = req.body;

    if (!req.user || !req.user._id) {
      console.log("the user does not exists");
      return res
        .status(401)
        .json({
          success: false,
          message: "Authentication failed. User not found.",
        });
    }
    const userId = req.user._id;

    if (!questionId || !submittedFlag) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    if (!submittedFlag.startsWith("csa_ctf{") || !submittedFlag.endsWith("}")) {
      return res.json({
        success: false,
        message: "Flag must be in format csa_ctf{yourflag}",
      });
    }

    const userFlag = submittedFlag.slice(8, -1).trim().toLowerCase();

    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    if (userFlag === question.flag.toLowerCase()) {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if ((user.solvedQuestions || []).includes(questionId)) {
        return res.json({
          success: false,
          message: "Already solved this challenge",
        });
      }

      user.solvedQuestions.push(questionId);
      user.score += question.points || 10;

      const nextQuestion = await Question.findOne({
        questionNumber: question.questionNumber + 1,
      });
      let nextQuestionId = null;

      if (nextQuestion) {
        nextQuestionId = nextQuestion._id;
      }

      user.lastSolvedAt = new Date();
      await user.save();

      return res.json({
        success: true,
        message: nextQuestion
          ? "Correct flag! Redirecting to the next challenge."
          : "Congratulations! You solved the final challenge!",
        newScore: user.score,
        nextQuestionId: nextQuestionId,
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect flag. Try again!",
      });
    }
  } catch (error) {
    console.error("Error submitting flag:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;