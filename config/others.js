const rateLimit = require('express-rate-limit');
//decrease product quantity after a order created


//limit email verification and forget password
const minutes = 30;
const emailVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

const passwordVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 100,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});


const defaultStage = {
  "Yet to Start": "Open",
  "Assigned": "Open",
  "Query": "Open",
  "In Progress": "Open",
  "Delivered": "Open",
  "Feedback": "Open",
  "Re Delivered": "Open",
  "Approved": "Open"
}

module.exports = {
  emailVerificationLimit,
  passwordVerificationLimit,
  defaultStage
};
