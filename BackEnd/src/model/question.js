const mongoose = require("mongoose");
const { Schema } = mongoose;
const questionSchema = new Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 1000,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    flag: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
      required: true,
    },
    hint: {
      type: String,
      trim: true,
      default: null,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Question = mongoose.model("question", questionSchema);
module.exports = Question;
