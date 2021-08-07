const sequelize = require("../../sequelize");
const { UserRoles } = sequelize.models;
const _USERROLES = require("../../_data/_userRoles.json");

const userRolesInit = async () => {
  await UserRoles.bulkCreate(_USERROLES, {
    validate: true,
    individualHooks: true,
  })
    .then(async (user) => {
      const count = await UserRoles.count();

      console.log("User Types Created:".bgYellow.black.bold, count);
    })
    .catch((e) => {
      // console.log("Add Users error:", e)
    });
};
module.exports = userRolesInit;
