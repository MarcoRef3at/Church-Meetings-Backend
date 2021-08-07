const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Churches", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please Add A Valid Email",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      validate: {
        isValidPhoneNo: function (value) {
          if (!value) return value;

          let regexp = /^[0-9]+$/;
          let values = Array.isArray(value) ? value : [value];

          values.forEach(function (val) {
            if (!regexp.test(val)) {
              throw new Error("Number only is allowed.");
            }
          });
          return value;
        },
      },
      defaultValue: "0",
    },
  });
};
