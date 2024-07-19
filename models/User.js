const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["User", "Admin", "Fielder"],
      default: "User",
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("find", function () {
  this.where({ status: true });
});

userSchema.pre("findOne", function () {
  this.where({ status: true });
});

userSchema.pre("aggregate", function () {
  // this.where({ status: true });
  this.pipeline().unshift({ $match: { status: true } });
});

userSchema.pre("countDocuments", function () {
  this.where({ status: true });
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
