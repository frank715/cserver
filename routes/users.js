var express = require("express");
const utilites = require("../utils/utilites");

const multer = require("multer");

const path = require("path");
let fs = require("fs-extra");

const {
  getGames,
  newGame,
  bulkUpdateGame,
  updateGame
} = require("../middlewares/user.middleware");
var router = express.Router();




router.get("/games", getGames);

router.post("/newgame", newGame);

router.post("/bulkupdategame", bulkUpdateGame);
router.post("/updategame", updateGame);





module.exports = router;
