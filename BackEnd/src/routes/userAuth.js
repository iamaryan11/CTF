const express = require("express");
const app = express();
// const ratelimit=require('express-rate-limit');
// const helmet=require("helmet");

const {
  signup,
  login,
  logout,
  adminRegister,
  // verifyOtp,
  // resendOtp,
  // forgotPassword,
  // resetPassword,
} = require("../controllers/userAuthent");

const { allquestion } = require("../controllers/questionController");
const { userMiddleware } = require("../middleware/userMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const Question = require("../model/question");
// app.use(helmet());

// const ratelimiter=ratelimit({
//   windowMs:10*60*1000,
//   max:10,
//   message:{
//     success:false,
//     message:"dont mess with the application, count your requests you are hitting the same endpoint again again :("
//   },
//   standardHeaders:true,
//   legacyHeaders:false,
//   // keyGenerator:(req)=>
//   //   req.body?.email_id||req.ip,
// ipv6Subnet: 56,

// })
const authRouter = express.Router();
// authRouter.post("/signup", ratelimiter,signup);
authRouter.post("/signup",signup);
// authRouter.post("/verify-otp",ratelimiter, verifyOtp);
// authRouter.post("/resend-otp", ratelimiter,resendOtp);
// authRouter.post("/forgot-password",ratelimiter,  forgotPassword); //--> userMiddleware hta dia maine
// authRouter.post("/reset-password", ratelimiter,resetPassword);//--> same hree
// authRouter.post("/forgot-password", userMiddleware, forgotPassword); //--> userMiddleware hta dia maine
// authRouter.post("/reset-password", userMiddleware, resetPassword);//--> same hree
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
authRouter.post("/adminRegister", adminMiddleware, adminRegister);
authRouter.post("/adminlogin", login);
authRouter.get("/allquestions", userMiddleware, allquestion);

authRouter.get("/check", userMiddleware, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      user: {
        _id: user._id,
        username: user.user_name,
        email: user.email_id,
        score: user.score || 0,
        currentQuestion: user.currentQuestion || "N/A",
        solved: user.solvedQuestions || 0,
      },
    });
  } catch (err) {
    console.error("Error in /check:", err);
    res.status(500).json({
      success: false,
      message: "Server error verifying user",
    });
  }
});

authRouter.get("/question/:id", userMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).select("-flag");
    res.status(200).json({ question });
  } catch (error) {
    res.status(404).json({ message: "Challenge not found" });
  }
});

authRouter.post("/submitFlag/:id", userMiddleware, async (req, res) => {
  const { flag } = req.body;
  const question = await Question.findById(req.params.id);

  if (!question) return res.status(404).json({ message: "Question not found" });

  if (question.flag === flag) {
    req.user.score += question.points;
    await req.user.save();
    res.status(200).json({ message: "Correct flag! Score updated." });
  } else {
    res.status(400).json({ message: " Incorrect flag!" });
  }
});

module.exports = { authRouter };