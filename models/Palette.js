const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const paletteSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    project_id: {
      type: ObjectId,
      required: false,
    },
    location: {
      type: { type: String, default: "Point", required: true },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    attributes: {
      type: {},
      required: false,
    },
    attachers: {
      type: [],
      required: true,
      default: [],
    },
    attachments: {
      type: [String],
      required: false,
    },
    panaroma: {
      type: [String],
      required: false,
    },
    downguys: {
      type: [],
      required:true,
      default:[]
    },
    verification_status:{
      type: String,
      enum:["Pending","Verified", "QC Failed", "Re Verified"],
      required:true,
      default:"Pending"
    },
    verifiedBy: {
      type:ObjectId,
      required:false,
      ref:"User"
    },
    type: {
      type: String,
      enum :['readonly', 'delivery']
    },
    log: {
      type: [{
        data: String,
        date: Date 
      }],
      default:[]
    }
  },
  {
    timestamps: true,
  }
);

// paletteSchema.pre("find", function () {
//   this.where({ status: true });
// });

// paletteSchema.pre("findOne", function () {
//   this.where({ status: true });
// });

// paletteSchema.pre("aggregate", function () {
//   // this.where({ status: true });
//   this.pipeline().unshift({ $match: { status: true } });
// });

// paletteSchema.pre("countDocuments", function () {
//   this.where({ status: true });
// });

const Palette =
  mongoose.models.Palette || mongoose.model("Palette", paletteSchema);

module.exports = Palette;
