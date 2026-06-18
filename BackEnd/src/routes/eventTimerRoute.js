const express = require("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();
const { EVENT_START, EVENT_END } = require("../config/eventTime");

router.get("/", (req, res) => {
  const now = new Date();
  let status = "upcoming";

  if (now >= EVENT_START && now <= EVENT_END) {
    status = "active";
  } else if (now > EVENT_END) {
    status = "ended";
  }

  res.json({
    serverTime: now.toISOString(),
    eventStartTime: EVENT_START.toISOString(),
    eventEndTime: EVENT_END.toISOString(),
    status,
  });
});

module.exports = router;