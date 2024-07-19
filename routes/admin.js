var express = require("express");

const {
  createUser,
  userList,
  updateConfig,
  updateUser,
  dumpPalettes,
  getPalettesByBoundary,
} = require("../middlewares/admin.middleware");
const multer = require("multer");

const path = require("path");
let fs = require("fs-extra");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { id } = req.params;
    dir = `uploads`;
    fs.mkdirsSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    console.log("File", file);
    cb(null, `${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

var router = express.Router();

router.post("/user", createUser);

router.post("/user/:id", updateUser);

router.get("/users", userList);

router.post("/config/:key", updateConfig);

router.post("/upload", upload.single("file"), dumpPalettes);

router.post("/palettes", getPalettesByBoundary);

module.exports = router;
