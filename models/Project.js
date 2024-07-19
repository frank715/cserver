const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    access: {
      type: [
        {
          user_id: ObjectId,
          permission: String,
        },
      ],
      required: true,
      default: [],
    },
    type:{
      type:String,
      required:true,
      enum:["delivery","readonly"],
      default:"delivery"
    },
    fielder: {
      type: ObjectId,
      required: false,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Pre Survey", "Fielder Verification", "QC", "Completed"],
      default: "Pre Survey",
    },
    updatedBy: {
      type: ObjectId,
      required: false,
      ref: "User",
    },
    boundary: {
      type: { type: String, default: "Polygon" },
      coordinates: {type: [[[Number]]], default: []}
    }
  },
  {
    timestamps: true,
  }
);

projectSchema.pre("find", function () {
  // this.where({ status: true });
});

projectSchema.pre("findOne", function () {
  // this.where({ status: true });
});

projectSchema.pre("aggregate", function () {
  // this.where({ status: true });
  // this.pipeline().unshift({ $match: { status: true } });
});

projectSchema.pre("countDocuments", function () {
  // this.where({ status: true });
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
