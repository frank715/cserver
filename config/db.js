require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("DB URL",process.env.MONGO_EXPRESS_CONFIG_URL);
    await mongoose.connect(process.env.MONGO_EXPRESS_CONFIG_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // dbName:"poleserver"

    });

    console.log("mongodb connection success!");
  } catch (err) {
    console.log("mongodb connection failed!", err.message);
  }
};

module.exports = connectDB;
