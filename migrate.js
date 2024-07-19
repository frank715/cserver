require("dotenv").config();
const connectDB = require("./config/db");

const User = require("./models/User");
const Jobs = require("./models/Jobs");
const Query = require("./models/Query");
const Attachments = require("./models/Attachments");
const Notes = require("./models/Notes");

const userData = require("./utils/user");
const Feedback = require("./models/Feedback");
const Region = require("./models/Region");
const Notifications = require("./models/Notifications");
const { notifications } = require("./config/config");
const TimeSheet = require("./models/TimeSheet");
const Project = require("./models/Project");
const Team = require("./models/Team");
const Client = require("./models/Client");

connectDB();
const migrateData = async () => {
  try {
    const clients = await Client.find();
    const rr = await clients.map(async (client) => {
      const projects = await Project.find({ client: client._id });
      let users = [];
      let manager = [];
      const t = await projects.map(async (d) => {
        const teams = await Team.find({ project_id: d._id });
        teams.map((d) => {
          users.push("" + d.lead);
          d.users.map((d1) => {
            users.push("" + d1);
          });
        });

        manager.push("" + d.manager);
      });

      await Promise.all(t);

      const u = Array.from(new Set(users));
      const m = Array.from(new Set(manager));
      const c = await Client.findOneAndUpdate(
        { _id: client._id },
        { users: u, manager: m }
      );
    });

    await Promise.all(rr);
    console.log("Migrated successfully");
    process.exit(1);
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

migrateData();
