const Question = require("../model/question");
const User = require("../model/user");
const HINT_POINT_PENALTY_PERCENTAGE = 0.2;
const allquestion = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("solvedQuestions").lean();
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found or session expired.",
        });
    }
    const solvedQuestionIds = new Set(
      user.solvedQuestions.map((id) => id.toString())
    );
    const questions = await Question.find(
      {},
      "title description points level"
    ).lean();

    const augmentedQuestions = questions.map((question) => {
      const isSolved = solvedQuestionIds.has(question._id.toString());

      return {
        ...question,
        isSolved: isSolved,
      };
    });
    res.status(200).json({ success: true, questions: augmentedQuestions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching questions" });
  }
};

const singleQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const question = await Question.findById(id, 'questionNumber description title  imageUrl points level  ').lean();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const user = await User.findById(userId).select("solvedQuestions").lean();
    const isSolved = user.solvedQuestions.some(
      (solvedId) => solvedId.toString() === question._id.toString()
    );
    const augmentedQuestion = {
      ...question,
      isSolved: isSolved,
    };

    res.json(augmentedQuestion);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const requestHint = async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user._id;

    const question = await Question.findById(questionId)
      .select("points hint")
      .lean();
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    if (!question.hint) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This challenge has no hint available.",
        });
    }

    const rawPenalty = question.points * HINT_POINT_PENALTY_PERCENTAGE;
    const penalty = Math.max(1, Math.round(rawPenalty));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { score: -penalty } },
      { new: true, select: "score" }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: `Hint taken. ${penalty} points deducted.`,
      hint: question.hint,
      newScore: updatedUser.score,
    });
  } catch (error) {
    console.error("Error requesting hint:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { allquestion, singleQuestion, requestHint };