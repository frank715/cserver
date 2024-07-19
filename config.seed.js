require("dotenv").config();
const { fields, attacher } = require("./config/config");
const connectDB = require("./config/db");
const Config = require("./models/Config");

const User = require("./models/User");
const userData = require("./utils/user");

connectDB();
const importData = async () => {
  try {
    await Config.deleteMany();
    await Config.insertMany({ fields: fields, attachers: attacher, downguys: attacher });

    console.log("data inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

importData();
