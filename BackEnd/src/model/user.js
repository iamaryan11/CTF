const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    email_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },
    role: {
      type: String,
      enum: ["player", "admin"],
      default: "player",
    },
    score: {
      type: Number,
      default: 0,
    },

    solvedQuestions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Question",
      default: [],
    },
    currentQuestion: {
      type: Number,
      default: 1,
    },
    lastQuestion: {
      type: Number,
      default: 1,
    },
    lastSolvedAt: {
      type: Date,
      default: null,
    },
    // otp: { type: String },
    // otpExpiry: { type: Date },
    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
