require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { signInToken, tokenForVerify, sendEmail } = require("../config/auth");
const utilites = require("../utils/utilites");
// const { sendEmailMailgun } = require("../config/mailer");
const Config = require("../models/Config");

const signUpUser = async (req, res, next) => {
  try {
    let {name, email, password, phone, type, username } = req.body;

    // {
    //   name: "Ravi Varma",
    //   email: "ravivarma1192@gmail.com",
    //   password: bcrypt.hashSync("123456"),
    //   phone: "9502932085",
    //   type: "Admin",
    //   username: "ravivarma1192",
    // },

    let existingUser = await User.findOne({email});
console.log('user new', req.body)
    if (existingUser) {
      return res.status(400).send(utilites.responseObj(false, "Email already exists"));
    }

    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password),
      phone,
      type,
      username
    });

    await newUser.save();

    const token = signInToken(newUser);

    console.log( {user: {
      _id: newUser._id,
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      type: newUser.type,
      username: newUser.username
    },
    token}, 'user obj')

    return res.send(
      utilites.responseObj(true, "User registered successfully", {
        user: {
          _id: newUser._id,
          username: newUser.username,
          name: newUser.name,
          phone: newUser.phone,
          email: newUser.email,
          type: newUser.type,
        },
        token
      }));

    } catch (err) {
      console.log(err);
      return res.status(500).send(utilites.responseObj(false, "Internal Server Error catch", err));
    }

};

const loginUser = async (req, res, next) => {
  try {
    let user;
    var re = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
console.log(req.body, 'req')
    if (re.test(req.body.email)) {
      user = await User.findOne({ email: req.body.email }).select("+password");
    } else {
      user = await User.findOne({ username: req.body.email }).select(
        "+password"
      );
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signInToken(user);
      return res.send(
        utilites.responseObj(true, "Succesfully logged in", {
          user: {
            token,
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            image: user.image,
            type: user.type,
            role: user.role,
            access_rights: user.access_rights,
            updatePassword: user.updatePassword,
          },
        })
      );
    } else {
      return res
        .status(401)
        .send(utilites.responseObj(false, "Invalid Email or password!"));
    }
  } catch (err) {
    console.log(err,"err")
    return res
      .status(500)
      .send(utilites.responseObj(false, "Internal Server Error", err));
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const otp = Math.random().toString(36).substring(2, 7);
    user.otp = otp;
    await user.save();

    // await sendEmailMailgun(user.email, "OTP to reset password", c);
    return res
      .status(200)
      .send(
        utilites.responseObj(
          true,
          "Successfully sent otp to registered email address"
        )
      );
  } catch (error) {
    console.log("E", error);
    return res
      .status(500)
      .send(utilites.responseObj(false, "Internal Server Error", error));
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      otp: req.body.otp,
    });
    if (!user) {
      return res.status(200).send(utilites.responseObj(false, "Invalid otp"));
    }

    user.password = bcrypt.hashSync(req.body.password);
    await user.save();
    return res
      .status(200)
      .send(
        utilites.responseObj(
          true,
          "Successfully changed your password, please login"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .send(utilites.responseObj(false, "Internal Server Error", err));
  }
};

const getFields = async (req, res) => {
  try {
    const config = await Config.findOne();
    return res.send(utilites.responseObj(true, "Fields information", config));
  } catch (error) {
    console.log("E", error);
    return res
      .status(500)
      .send(utilites.responseObj(false, "Internal Server Error", error));
  }
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  getFields,
  signUpUser
};
