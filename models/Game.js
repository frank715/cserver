const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    interval: { type: Number, required: true },
    icon: { type: String, required: true },
    color: {type: String, required: true},
    dates: {
        type: Map,
        of: {
            type: Map,
            of: String 
        },
        required: true
    }
});

gameSchema.pre("find", function () {
    this.where({ status: true });
  });
  
  gameSchema.pre("findOne", function () {
    this.where({ status: true });
  });
  
  gameSchema.pre("aggregate", function () {
    // this.where({ status: true });
    this.pipeline().unshift({ $match: { status: true } });
  });
  
  gameSchema.pre("countDocuments", function () {
    this.where({ status: true });
  });

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
module.exports = Game;