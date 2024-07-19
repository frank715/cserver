const utilites = require("../utils/utilites");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");
const Config = require("../models/Config");

const excelToJson = require("convert-excel-to-json");
const Palette = require("../models/Palette");

const { v4: uuidv4 } = require('uuid');


const createUser = async (req, res) => {
  try {
    let body = req.body;
    body.password = bcrypt.hashSync(req.body.password || "123456");
    const user = new User(body);
    if (await user.save()) {
      return res.send(
        utilites.responseObj(true, "User created successfully", user)
      );
    }
    return res.send(utilites.responseObj(false, "Unable to create the user"));
  } catch (error) {
    return res.send(
      utilites.responseObj(false, "Internal Server Error", error)
    );
  }
};

const updateUser = async (req, res) => {
  try {
    let data = req.body;
    if (req.body.password) data.password = bcrypt.hashSync(req.body.password);

    const user = await User.findOneAndUpdate({ _id: req.params.id }, data);
    return res.send(utilites.responseObj(true, "Updated successfully", user));
  } catch (error) {
    return res.send(
      utilites.responseObj(false, "Internal Server Error", error)
    );
  }
};

const deleteUser = async (req, res) => { };

const userList = async (req, res) => {
  try {
    const users = await User.find().select("name email type");
    return res.send(utilites.responseObj(true, "User List", users));
  } catch (error) {
    return res.send(
      utilites.responseObj(false, "Internal Server Error", error)
    );
  }
};

const updateConfig = async (req, res) => {
  try {
    const config = await Config.updateOne({}, { [req.params.key]: req.body });
    return res.send(utilites.responseObj(true, "Updated successfully", config));
  } catch (error) {
    return res.send(
      utilites.responseObj(false, "Internal Server Error", error)
    );
  }
};

function importExcelData2MongoDB(filePath, sheet) {
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        name: sheet,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      },
    ],
  });
  return excelData;
}

const dumpPalettes = async (req, res) => {
  try {


    let data = await importExcelData2MongoDB(
      process.cwd() + "/uploads/" + req.file.filename,
      // + req.file.filename,
      "Sheet1"
    );
    const palettes = [];

    data.Sheet1.map((d) => {
      const latlng = d.LAT_LON.split(",");

      let p = {};
      p.name = d.OBJECTID;

      const newLat = [];

      newLat[0] = parseFloat(latlng[1]);
      
      newLat[1] = parseFloat(latlng[0]);

      delete d.LAT_LON;
      p.location = {type:"Point", coordinates: newLat};
      p.attributes = d;
      p.uid = uuidv4()


      palettes.push(p);

    })

    const pal = await Palette.insertMany(palettes);

    return res.send(utilites.responseObj(false,"Data", pal))


  } catch (error) {
    return res.send(
      utilites.responseObj(false, "Internal Server Error", error)
    );
  }
}

const getPaletteById = async (req, res) => {
  try{
    const id = await Palette.findOne({_id: req.params.id});
    return res.send(utilites.responseObj(true,"Palette data", id));
  }catch(error){
    return res.send({ error: error.message });
  }
}

const getPalettesByBoundary = async (req, res) => {
  try{
    const palettes = await Palette.find({
       location: {
        $geoWithin: {
          $geometry: req.body
        }
      }
    }).select("name location verification_status uid");
    return res.send(utilites.responseObj(true,"Palettes", palettes))

  }catch(error){
    return res.send(
      utilites.responseObj(false, "Internal Server Error", error)
    );
  }
}

module.exports = {
  createUser,
  userList,
  updateConfig,
  updateUser,
  dumpPalettes,
  getPalettesByBoundary,
  getPaletteById
};
