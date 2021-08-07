const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Attendance", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    presenterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
