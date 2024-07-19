require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const utilites = require('../utils/utilites');

const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
      type: user.type,
      role: user.role
    },
    process.env.JWT_SECRET,
    // {
    //   expiresIn: '2d',
    // }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: '15m' }
  );
};

const isAuth = async (req, res, next, type) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      if (!decoded) {
        res.status(401).send(utilites.responseObj(false, "Invalid authentication from ", decoded));
      } 
      
      req.user = decoded;
      if (type) {
        if (type === decoded.type || 'Admin' == decoded.type) {
          next();
        } else {
          res.status(401).send(utilites.responseObj(false, "Invalid authentication", decoded));
        }
      } else {
        next();
      }

    } else {
      res.status(401).send(utilites.responseObj(false, "Invalid authentication 62", authorization));
    }
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const admin = await User.findOne({ role: 'Admin' });
  if (admin) {
    next();
  } else {
    res.status(401).send({
      message: 'User is not Admin',
    });
  }
};

const sendEmail = (body, res, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify(function (err, success) {
    if (err) {
      res.status(403).send({
        message: `Error happen when verify ${err.message}`,
      });
      console.log(err.message);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      res.status(403).send({
        message: `Error happen when sending email ${err.message}`,
      });
    } else {
      res.send({
        message: message,
      });
    }
  });
};

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  sendEmail

};
