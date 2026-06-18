const jwt = require("jsonwebtoken");
const User = require("../model/user");
const redisClient = require("../config/redis");
const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token not present- form user middleware");
    }
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const { _id } = payload;

    if (!_id) {
      throw new Error("invalid token may be id not found from user middleware");
    }
    const result = await User.findById(_id);

    if (!result) {
      throw new Error("User does not exist from user middleware");
    }
    const IsBlocked = await redisClient.exists(`token:${token}`);
    if (IsBlocked) {
      throw new Error("Invalid token user is blocked-- user middleware");
    }
    req.result = result;
    req.user = result;
    next();
  } catch (err) {
    res.status(401).send("Error occurred from usermiddleware " + err);
  }
};

module.exports = { userMiddleware };