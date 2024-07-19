require("dotenv").config();
const connectDB = require("./config/db");

const User = require("./models/User");
const userData = require("./utils/user");

connectDB();
const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(userData);

    console.log("data inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

importData();
