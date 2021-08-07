const asyncHandler = require("../../middleware/async");
const { execludeAttribute, permissionsInclude } = require("./_functions");
const sequelize = require("../../sequelize");
const { Users } = sequelize.models;

/* @des         **Get All Users**
                Get All Users from database
                then count them and
                responde with the users data and their count 
*/
// @route       GET /api/v2/users
// @access      Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  // Get All Users from Database
  let users = await Users.findAll({
    ...execludeAttribute,
    ...permissionsInclude,
  });

  // Count Retrieved Users
  const count = await Users.count();

  // Responde with Count and Users Data
  res.status(200).json({ success: true, count, data: users });
});
