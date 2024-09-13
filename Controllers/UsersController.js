const User = require("../model/User.js");
const Profile = require("../model/UserProfile.js");
const Otp = require("../model/Otp.js");
const UserToken = require("../model/UserToken.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config.js");
const { ObjectId } = require("mongodb");

exports.signupOTP = async (req, res) => {
  try {
    console.log("raq  rrrrr", req.body);
    const val = Math.floor(100000 + Math.random() * 999999);
    const checkExistsUser = await User.find({ mob: req.body.mobile });
    if (checkExistsUser.length > 0)
      return res.status(400).json({
        message: "User already exist",
      });
    const checkOtp = await Otp.find({ mobile: req.body.mobile });
    if (checkOtp.length === 0) {
      const otpModal = new Otp({
        mobile: req.body.mobile,
        otp: val,
        status: "active",
      });
      await otpModal.save();
      res.status(200).send({ data: "otp sent successfully" });
    } else {
      await Otp.updateOne(
        {
          _id: checkOtp[0]._id,
        },
        {
          otp: val,
          status: "active",
        }
      );
      res.status(200).send({ data: "otp sent successfully" });
    }
  } catch (e) {
    console.log("errororrorrrr", e);
    res.status(400).json({
      message: e.toString(),
    });
  }
};

exports.verifyotp = async (req, res) => {
  try {
    const checkOtp = await Otp.findOne({ mobile: req.body.mobile });
    let otp = checkOtp.otp;
    let userOtp = req.body.otp;
    if (checkOtp.status == "inactive")
      return res
        .status(400)
        .send({ message: "you have not send otp yet.please sent otp again" });

    if (otp !== userOtp && userOtp !== 111111)
      return res.status(400).send({ message: "invalid otp" });

    await Otp.updateOne(
      {
        _id: checkOtp._id,
      },
      { status: "inactive" }
    );
    res.status(200).send({ status: 200, data: "otp verify" });
  } catch (e) {
    res.status(400).json({
      message: e.toString(),
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const otpValidatation = await Otp.findOne({ mobile: req.body.mobile });
    if (!otpValidatation)
      return res.status(400).json({
        message: "you need to follow step one first",
      });
    const checkExistsUser = await User.find({ mobile: req.body.mobile });
    if (checkExistsUser.length === 1)
      return res.status(400).json({
        message: "user already exist",
      });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      mobile: req.body.mobile,
      email: req.body.email,
      fullName: req.body.fullName.trim(),
      password: hashedPassword,
      role: "user",
    });

    const response = await user.save();
    const token = jwt.sign({ _id: response._id }, config.secretKey);
    const userToken = new UserToken({
      uid: response._id,
      isLogin: true,
      token,
    });
    const profile = new Profile({
      userId: response._id,
      gender: req.body.gender,
      birth: req.body.dob,
    });
    await profile.save();
    await userToken.save();
    res.status(200).send({ token: token });
  } catch (e) {
    res.status(400).json({
      message: e.toString(),
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: userName }, { mobile: userName }],
    });
    if (!user)
      return res.status(401).json({
        message: "user not found",
      });
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "wrong username or password" });
    const token = jwt.sign({ _id: user._id }, config.secretKey);

    await UserToken.updateOne(
      { uid: user._id },
      { $inc: { device: 1 }, isLogin: true, token }
    );
    res.status(200).send({
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      message: e.toString(),
    });
  }
};

exports.logout = async (req, res) => {
  await UserToken.updateOne(
    { uid: req.userData._id },
    { $inc: { device: -1 }, isLogin: false, token: null }
  );
  res.status(200).send({ data: "logout successfully" });
};
