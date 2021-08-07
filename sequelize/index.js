const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");
// Load env vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// const sequelize = new Sequelize(process.env.DB_URI);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    // storage: "debugger.mysql",
    operatorAliases: false,
    define: {
      freezeTableName: true,
      // timestamps: false,
    },
    logging: false,
  }
);

const modelDefiners = [
  require("../models/Users.model"),
  require("../models/Permissions.model"),
  require("../models/Relations.model"),
  require("../models/Churches.model"),
  require("../models/Services.model"),
  require("../models/ServiceCategory.model"),
  require("../models/Attendance.model"),
  require("../models/Groups.model"),
];

//define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
