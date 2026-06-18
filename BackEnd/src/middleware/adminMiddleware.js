const jwt = require("jsonwebtoken");
const User = require("../model/user");
const redisClient = require("../config/redis");
const adminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token not persent- from adminmiddleware");
    }
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = payload;
    const { _id } = payload;
    if (!_id) {
      throw new Error("invalid token may be id not found");
    }
    const result = await User.findById(_id);

    if (payload.role != "admin") {
      throw new Error("Invlaid token");
    }
    if (!result) {
      throw new Error("User does not exist from admin middleware");
    }
    const IsBlocked = await redisClient.exists(`token:${token}`);
    if (IsBlocked) {
      throw new Error("Invalid token admin is blocked-- admin middleware");
    }
    req.result = result;
    next();
  } catch (err) {
    res.status(401).send("Error occurred from adminmiddleware " + err);
  }
};

module.exports = { adminMiddleware };