const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Groups", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ageFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ageTo: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
