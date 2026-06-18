const User = require("../model/user");
const validate = require("../utils/validator");
const redisClient = require("../config/redis");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

const signup = async (req, res) => {
  try {
    validate(req.body);
    const { user_name, email_id, phone, password } = req.body;

    const existing = await User.findOne({ email_id });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    // const otp = crypto.randomInt(100000, 999999).toString();

    // const otpExpiry = Date.now() + 10 * 60 * 1000;

//     const user = await User.create({
//       user_name,
//       email_id,
//       phone,
//       password: hashedPassword,
//       role: "player",
//       // otp: otp,
//       // otpExpiry,
//       // isVerified: false,
//     });

//     await sendEmail({
//       to: email_id,
//       subject: "CTF Platform - Verify your Email",
//       text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
//     });

//     res.status(201).json({
//       message:
//         "User registered successfully. Please verify your email with the OTP sent.",
//       userId: user._id,
//     });
//   } catch (err) {
//     res.status(400).send("Error during signup: " + err.message);
//   }
// };

const user = await User.create({
      user_name,
      email_id,
      phone,
      password: hashedPassword,
      role: "player",
      // otp: otp,
      // otpExpiry,
      // isVerified: false,
    });

    // await sendEmail({
    //   to: email_id,
    //   subject: "CTF Platform - Verify your Email",
    //   text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    // });

    res.status(201).json({
      message:
        "User registered successfully.",
      userId: user._id,
    });
  } catch (err) {
    res.status(400).send("Error during signup: " + err.message);
  }
};

// const verifyOtp = async (req, res) => {
//   try {
//     const { email_id, otp } = req.body;

//     //  const match = await bcrypt.compare(password, user.password);
//     // if (!match) {
//     //   return res.status(400).json({ message: "Invalid credentials." });
//     // }
//     const user = await User.findOne({ email_id });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.isVerified) {
//       return res.status(400).json({ message: "User already verified." });
//     }
//     // i have added this remove if it thorws error
//     // const matchotp=await bcrypt.compare(otp,user.otp);

//     if (user.otp !== otp || Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "Invalid or expired OTP." });
//     }
//     // if (!matchotp || Date.now() > user.otpExpiry) {
//     //       return res.status(400).json({ message: "Invalid or expired OTP." });
//     //     }

//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();


//     const token = jwt.sign(
//       { _id: user._id, email_id: user.email_id, role: user.role },
//       process.env.JWT_KEY,
//       { expiresIn: "1h" }
//     );



//     res.cookie("token", token, {
//       maxAge: 60 * 60 * 1000,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     res.status(200).json({
//       message: "Email verified successfully. Logged in.",
//       token,
//       user: {
//         id: user._id,
//         email_id: user.email_id,
//         user_name: user.user_name,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({ message: "Error verifying OTP: " + err.message });
//   }
// };

// const resendOtp = async (req, res) => {
//   try {
//     const { email_id } = req.body;
//     const user = await User.findOne({ email_id });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "User already verified" });
//     }
//     // i have commented the below line
//     const otp = crypto.randomInt(100000, 999999).toString();
//     // const otp = await bcrypt.hash(crypto.randomInt(100000, 999999).toString(),3);

//     const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     await sendEmail({
//       to: user.email_id,
//       subject: "Resend OTP - Verify Your Account",
//       text: `Your new OTP is: ${otp}. It will expire in 10 minutes.`,
//     });

//     res.status(200).json({ message: "New OTP sent to your email." });
//   } catch (err) {
//     console.error("Error resending OTP:", err);
//     res.status(500).json({ message: "Error resending OTP: " + err.message });
//   }
// };

const login = async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    const user = await User.findOne({ email_id });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }


    // if (!user.isVerified) {
    //   return res
    //     .status(403)
    //     .json({ message: "Please verify your email before logging in." });
    // }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials." });
    }


    const token = jwt.sign(
      { _id: user._id, email_id: user.email_id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );


    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      // in production aryan change sameSite to strict
      // sameSite: "strict",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",


      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Logged in successfully.",
      token,
      user: {
        id: user._id,
        email: user.email_id,
        username: user.user_name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Error occurred while logging in.",
        error: err.message,
      });
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      await redisClient.set(`token:${token}`, "blocked", "EX", 60 * 60 * 24); // expires in 1 day
    }
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

const adminRegister = async (req, res) => {
  try {
    validate(req.body);
    const { user_name, email_id, password } = req.body;
    req.body.password = await bcrypt.hash(password, 8);

    const user = await User.create({ ...req.body, role: "admin" });

    // while signing jwt here i have aslo added role as a payload
    const token = jwt.sign(
      { _id: user._id, email_id: email_id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, {
      httpOnly: true, // nice aryann
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).send(`${user.role} Registered successfully`);
  } catch (err) {
    res.status(400).send("An error ocuured while registering admin " + err);
  }
};


// const forgotPassword = async (req, res) => {
//   try {
//     const { email_id } = req.body;

//     if (!email_id) {
//       return res
//         .status(400)
//         .json({ message: "Please provide an email address." });
//     }

//     const user = await User.findOne({ email_id });

//     if (!user) {

//       return res
//         .status(200)
//         .json({
//           message:
//             "If a matching account was found, a password reset OTP has been sent to your email.",
//         });
//     }

//     if (!user.isVerified) {
//       return res
//         .status(403)
//         .json({
//           message:
//             "Please verify your email first before attempting a password reset.",
//         });
//     }


//     const otp = crypto.randomInt(100000, 999999).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

    
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

    
//     await sendEmail({
//       to: user.email_id,
//       subject: "CTF Platform - Password Reset OTP",
//       text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes. Do not share this code.`,
//     });

//     res.status(200).json({
//       message:
//         "Password reset OTP sent to your email. It is valid for 10 minutes.",
//     });
//   } catch (err) {
//     console.error("Forgot Password Error:", err);
//     res
//       .status(500)
//       .json({ message: "Error during password reset request: " + err.message });
//   }
// };


// const resetPassword = async (req, res) => {
//   try {
//     const { email_id, otp, newPassword } = req.body;

//     if (!email_id || !otp || !newPassword) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email, OTP, and the new password." });
//     }

//     const user = await User.findOne({ email_id });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }


//     if (
//       user.otp !== otp ||
//       Date.now() > user.otpExpiry ||
//       user.otp === undefined
//     ) {
//       return res.status(400).json({ message: "Invalid or expired OTP." });
//     }


//     const hashedPassword = await bcrypt.hash(newPassword, 8);


//     user.password = hashedPassword;
//     user.otp = undefined; 
//     user.otpExpiry = undefined; 
//     await user.save();

//     res
//       .status(200)
//       .json({
//         message: "Password has been successfully reset. You can now log in.",
//       });
//   } catch (err) {
//     console.error("Reset Password Error:", err);
//     res
//       .status(500)
//       .json({ message: "Error resetting password: " + err.message });
//   }
// };

module.exports = {
  signup,
  login,
  // verifyOtp,
  // resendOtp,
  logout,
  adminRegister,
  // forgotPassword,
  // resetPassword,
};