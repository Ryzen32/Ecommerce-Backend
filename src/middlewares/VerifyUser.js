const User = require("../models/User");

const verifyUser = async (req, res, next) => {
  const { phone, email } = req.body;
  try {
    let user = await User.find({ $or: [{ phone }, { email }] });
    if (user.length) {
      res.status(200).json("user already present !");
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { verifyUser };
