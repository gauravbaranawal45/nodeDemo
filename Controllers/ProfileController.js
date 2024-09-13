const User = require("../model/User.js");
const { ObjectId } = require("mongodb");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, accountDeleted: 0 });
    res.status(200).send({ data: users });
  } catch (err) {
    console.log("err", err);
  }
};

exports.updateprofile = async (req, res) => {
  try {
    const updateRes = await DoctorProfileModel.updateOne(
      {
        userId: req.userData._id,
      },
      { ...req.body }
    );
    const userRes = await User.updateOne(
      {
        _id: req.userData._id,
      },
      { ...req.body }
    );
    console.log("updateRes", updateRes, userRes);
  } catch (err) {
    console.log("err", err);
  }
};
