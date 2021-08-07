const { addUser } = require("./addUser");
const { deleteUser } = require("./deleteUser");
const { getUser } = require("./getUser");
const { getUsers } = require("./getUsers");
const { updateUser } = require("./updateUser");
const { updateUserPermissions } = require("./updateUserPermissions");

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  updateUserPermissions,
};
