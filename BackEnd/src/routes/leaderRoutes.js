const express = require("express");
const leaderRoute = express.Router();
const User = require("../model/user");
const { userMiddleware } = require("../middleware/userMiddleware");

leaderRoute.get("/leaderboard", async (req, res) => {
  // jb maine userMiddlleware run nhi kiya tb error nhi aya--keep it as it is
  try {
    const leaderboard = await User.find(
      {},
      "user_name score lastSolvedAt "
    ).sort({ score: -1, lastSolvedAt: 1 });

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the leaderboard",
    });
  }
});

module.exports = leaderRoute;