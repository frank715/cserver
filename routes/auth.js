var express = require("express");
const {
  loginUser,
  forgotPassword,
  resetPassword,
  getFields,
  signUpUser
} = require("../middlewares/auth.middleware");

var router = express.Router();

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiBody {String} email Required Email id to login.
* @apiBody {String} password Required Enter password.
* @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
    "status": true,
    "message": "Succesfully logged in",
    "data": {
        "user": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY0ZDhhZDM3YjU2YjJmNjQ2MmFlOTgiLCJuYW1lIjoiUmF2aSBWYXJtYSIsImVtYWlsIjoicmF2aXZhcm1hMTE5MkBnbWFpbC5jb20iLCJwaG9uZSI6Ijk1MDI5MzIwODUiLCJ0eXBlIjoiQWRtaW4iLCJyb2xlIjoiUmVzb3VyY2UiLCJpYXQiOjE2NjgxNDg1NjcsImV4cCI6MTY2ODMyMTM2N30.TR_BHQ-doKWyytZA0b5JrSxYxNE0gJdNEfM88CT6pAc",
            "_id": "6364d8ad37b56b2f6462ae98",
            "name": "Ravi Varma",
            "phone": "9502932085",
            "email": "ravivarma1192@gmail.com",
            "type": "Admin",
            "role": "Resource"
        },
        "config": {}
    }
}
 */

router.post(
  "/login",
  (req, res, next) => {
    if (req.body.email && req.body.password) {
      next();
    } else {
      return res.send("Invalid Formsdata");
    }
  },
  loginUser
);

router.post("/signup", signUpUser );

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/fields", getFields);



module.exports = router;
