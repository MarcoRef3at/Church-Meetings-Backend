const permissionsInit = require("./permissionsInit");
const usersInit = require("./usersInit");
const userRolesInit = require("./userRolesInit");

module.exports = async () => {
  await userRolesInit();
  await permissionsInit();
  await usersInit();
};
