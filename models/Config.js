const mongoose = require("mongoose");
const { fields, attacher, downguys } = require("../config/config");

const ObjectId = mongoose.Schema.Types.ObjectId;

const configSchema = new mongoose.Schema(
  {
    fields: {
      type: {},
      default: fields,
      required: false,
    },
    attachers: {
      type: {},
      default: attacher,
      required: false,
    },
    downguys: {
      type: {},
      default: downguys,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Config = mongoose.models.Config || mongoose.model("Config", configSchema);

module.exports = Config;
