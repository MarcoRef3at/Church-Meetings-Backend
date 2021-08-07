const bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          usernameFormat() {
            if (!this.username.includes(".")) {
              throw new Error(
                "Username Format Should be like : `FirstName.LastName`"
              );
            }
            if (this.username.length < 5) {
              throw new Error("Username must be at least 5 characters");
            }
          },
        },
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
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NA",
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 32],
            msg: "Password must be at least 6 characters",
          },
        },
        get() {}, //prevent password return
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpire: DataTypes.DATE,
    },
    {
      hooks: {
        // Encrypt Password
        afterValidate: (user) => {
          if (user.dataValues.password) {
            user.dataValues.password = bcrypt.hashSync(
              user.dataValues.password,
              10
            );
          }
        },
      },
    }
  );
  sequelize.define(
    "UserRoles",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      level: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
