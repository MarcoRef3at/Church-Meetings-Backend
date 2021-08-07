const db_initial = require("./db_initial");
const sequelize = require("../sequelize");

const connectDB = async () => {
  console.log(`Checking database connection...`);
  try {
    await sequelize.sync({
      // Drop Table on every restart
      force: JSON.parse(process.env.DROP_DB),
    });
    console.log("Database Connected! ".bgYellow.black.bold);

    // Set Database initial Values from json files in _data folder
    await db_initial();
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
