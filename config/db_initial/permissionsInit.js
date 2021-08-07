const sequelize = require("../../sequelize");
const { Permissions } = sequelize.models;
const _PERMISSIONS = require("./../../_data/_permessions.json");

const permissionsInit = async () => {
  await Permissions.bulkCreate(_PERMISSIONS)
    .then(async () => {
      const count = await Permissions.count();
      console.log("Permissions Created:".bgYellow.black.bold, count);
    })
    .catch((e) => {
      // console.log("Create Permissions Error:", e)
    });
};
module.exports = permissionsInit;
