const Question = require("../model/question");
const User = require("../model/user");

const questionsCreate = async (req, res) => {
  const {
    questionNumber,
    description,
    title,
    imageUrl,
    flag,
    points,
    level,
    hint,
  } = req.body;

  try {
    const user = await User.findOne({ email_id: req.user.email_id });
    const questionadd = await Question.create({
      ...req.body,
      adminId: user._id,
    });
    res
      .status(201)
      .send(`New Question added Successfully by ${user.user_name}`);
  } catch (err) {
    res.send("An error occured while adding questions " + err);
  }
};

module.exports = {
  questionsCreate,
};
