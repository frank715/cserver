var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
var fs = require("fs");
var morgan = require("morgan");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");





// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var adminRouter = require("./routes/admin");

const { isAuth, isAdmin } = require("./config/auth");
const utilites = require("./utils/utilites");
connectDB();

var app = express();

app.use(bodyParser.json({ limit: "35mb" }));

// if (process.env.ENVIRONMENT != "production") {
  app.use(cors());

  app.use(function (req, res, next) {
    // const allowedOrigins = ["https://projectmatrix.centillionnetworks.in"];
    const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //   res.setHeader("Access-Control-Allow-Origin", origin);
    // }

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, authorization"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });
// }

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/pole", express.static(path.join(__dirname, "fontend")));
app.use("/pole", express.static("fontend"));
app.use("/pole/stylesheets", express.static("fontend"));

app.use("/login", express.static("fontend"));

app.use("/dashboard", express.static("fontend"));

app.use("/uploads", express.static("uploads"));

// app.use("/", indexRouter);

// app.use((req, res, next) => {
//   const { access_token } = req.headers;
//   if (access_token) {
//     try {
//       const decoded = jwt.verify(access_token, process.env.ACCESS_KEY);

//       if (decoded) {
//         next();
//       } else {
//         return res.status(401).send(utilites.responseObj(false, "Not allowed"));
//       }
//     } catch (error) {
//       return res.status(401).send(utilites.responseObj(false, "Not allowed"));
//     }
//   } else {
//     return res.status(401).send(utilites.responseObj(false, "Not allowed"));
//   }
// });

app.use("/auth", authRouter);

app.use(
  "/admin",
  (req, res, next) => {
    isAuth(req, res, next);
  },
  adminRouter
);

app.use(
  "/users",
  (req, res, next) => {
    console.log(req.path)
    if (req.path === '/games') {
      return next(); // Skip authentication middleware
    }else{
      isAuth(req, res, next);
    }
  },
  usersRouter
);

// app.use((req, res, next) => {
//   return res.redirect("/");
// });

// catch 404 and forward to error handlerI
app.use(function (req, res, next) {
  // next(createError(404));
  res
    .status(404)
    .send(utilites.responseObj(false, "Not able to find the route"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
