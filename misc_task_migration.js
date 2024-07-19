const connectDB = require("./config/db");

const Project = require("./models/Project");
connectDB();
const migrateData = async () => {
  try {
    const projects = await Project.updateMany(
      {},
      {
        misc_tasks: [
          "Idle",
          "TRG",
          "Leave",
          "Permission",
          "Project Management",
          "Week Off",
          "Application Loss",
          "Cross Training",
        ],
        users: [],
        approvers: [],
      }
    );
    console.log("Migrated successfully");
    process.exit(1);
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

migrateData();
