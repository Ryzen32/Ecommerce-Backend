const { User } = require("../models/User");
const CryptoJS = require("crypto-js");
const userDetails = async (req, res) => {
    const { email, phone } = req.query;
  try {
    if (email) {
      let user = await User.findOne({ email });
      user.password = "";
      res.status(200).json(user);
    } else {
      let user = await User.findOne({ phone });
      res.status(200).json(user);
      user.password = "";
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const userPatch = async (req, res) => {
  const { _id, password } = req.body;

  try {
    const savedUser = await User.findByIdAndUpdate(
      { _id },
      {
        password: CryptoJS.AES.encrypt(
          password,
          process.env.PASS_SECRET
        ).toString(),
      }
    );
    res.status(201).json({
      message: "Password Reset ssuccessful",
      signupUser: savedUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { userDetails, userPatch };
