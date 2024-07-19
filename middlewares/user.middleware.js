const utilites = require("../utils/utilites");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");


const fs = require("fs");

// const redis = require("redis");
const { REDIS_CACHE_DURATION } = require("../utils/constants");

const ObjectId = mongoose.Types.ObjectId;

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();
//   redisClient.on("error", (error) => console.error(`Error : ${error}`));
//   redisClient.on("ready", () => {});
//   await redisClient.connect();
// })();

var admin = require("firebase-admin");
const User = require("../models/User");
const Game = require("../models/Game");
const moment = require("moment");

// var serviceAccount = require("../admin.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });



const getGames = async (req, res) => {
  try {
    console.log('after')
    const games = await Game.find({});
    // console.log('games', games)
    
    // Return users list as JSON response
    return res.send(utilites.responseObj(true, "games list", {games} ));
  } catch (error) {
      // Handle errors and return error response
      return res.json(utilites.responseObj(false, "some error occurred", { error: error.message } ), { status: 500 })
  }
}

const newGame = async(req, res) => {
  try {
    // Execute the authentication middleware
    const reqBody = await req.body;

    // Destructure request body to extract game details
    const { gameName, startTime, endTime, interval, icon, dates, color } = reqBody;

    const today = moment().format('YYYY-MM-DD');
    
    // Initialize an empty object for today's intervals
    const todayIntervals = {};

    // Generate the intervals for today's date
    let currentTime = moment(startTime, 'HH:mm');
    const endTimeMoment = moment(endTime, 'HH:mm');
    // console.log(interval, 'interval')
    if (interval === "0") {
        todayIntervals[currentTime.format('HH:mm')] = "";
    }else{
      while (currentTime <= endTimeMoment) {
          todayIntervals[currentTime.format('HH:mm')] = "";
          currentTime = currentTime.add(interval, 'minutes');
      }
    }


    // Add today's date with the generated time slots to the dates object
    const updatedDates = {[today]: todayIntervals };

    const newGame = new Game({
        gameName,
        startTime,
        endTime,
        interval,
        icon,
        color,
        dates: updatedDates
    });

    // // Save the new game to your MongoDB database
    await newGame.save();
    // console.log(newGame, "newGame")

    // Return a successful response
    return res.json(utilites.responseObj(true, "New game added successfully"));
  } catch (error) {
      // Handle errors and return error response
      return res.json(utilites.responseObj(false, "some error occurred", { error: error.message } ), { status: 500 })
  }
}

const bulkUpdateGame = async(req, res) => {
  try {
    // Execute the authentication middleware
    const reqBody = await req.body;

    // Destructure request body to extract updated game details
    const { _id, dates, selectedDate } = reqBody;

    // Find the game by ID
    // const game = await Game.findById(_id);
    const updatedGame = await Game.findOneAndUpdate(
      { _id },
      {[`dates.${selectedDate}`]:dates[selectedDate]},
      // {dates},
      {new: true, upsert: true}
    );

    if (!updatedGame) {
      return res.send(utilites.responseObj(false, "Game not found"), { status: 404 });
    }
  
    return res.send(utilites.responseObj(true, "Game updated successfully"));
  } catch (error) {
    // Handle errors and return error response
    return res.send(utilites.responseObj(false, "Some error occurred", { error: error.message }), { status: 500 });
  }
}

const updateGame = async (req, res) => {
  try {
    // Execute the authentication middleware
    const reqBody = await req.body;

    // Destructure request body to extract updated game details
    const { _id, dates } = reqBody;

    // Find the game by ID
    const game = await Game.findById(_id);
    if (!game) {
      return res.send(utilites.responseObj(false, "Game not found"), { status: 404 });
    }

    // let updatedGameDates = { ...game.dates.toJSON() };
    // Get the current date and time
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm');
    console.log('currentTime', currentTime   )
    // Check if the dates object contains today's date and validate time slots
    if (dates[currentDate]) {
        const todaySlots = {...dates[currentDate]};
        
        for (const time in todaySlots) {
          if (moment(time, 'HH:mm').isBefore(moment(currentTime, 'HH:mm'))) {
            // Skip updates to past time slots
            delete todaySlots[time];
          }
        }
        let gamesDates = Object.fromEntries(game.dates);
        let assumeddates = Object.fromEntries(gamesDates[currentDate])
        let parsedDates = gamesDates;
        // console.log('parsedDates', parsedDates)
        dates[currentDate] = { ...assumeddates, ...todaySlots };
        // console.log('current datess', dates[currentDate] )
      }
  
      // Merge the existing dates with the new dates
      let updatedGameDates = { ...game.dates.toJSON(), ...dates };
    //   console.log('updatedGameDates', updatedGameDates)
    //   updatedGameDates = {...updatedGameDates, ...dates}
      game.dates = {...updatedGameDates};

    // Save the updated game object to the database
    console.log('game', game)
    await game.save();

    // Return a successful response
    return res.send(utilites.responseObj(true, "Game updated successfully"));
  } catch (error) {
    // Handle errors and return error response
    return res.send(utilites.responseObj(false, "Some error occurred", { error: error.message }), { status: 500 });
  }
}

module.exports = {
  getGames,
  newGame,
  bulkUpdateGame,
  updateGame
};

