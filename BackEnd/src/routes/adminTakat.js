const express = require("express");
const adminRight = express.Router();
const { adminMiddleware } = require("../middleware/adminMiddleware");
const { questionsCreate } = require("../controllers/adminCrud");

adminRight.post("/addquestion", adminMiddleware, questionsCreate);
module.exports = { adminRight };