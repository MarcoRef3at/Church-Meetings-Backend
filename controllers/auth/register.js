const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const { Users } = sequelize.models;

/* @des         **Register User**
                  Register A New Disabled User that needs Activation from Admin to login
*/
// @route       POST /api/v2/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await Users.create(req.body);
  res.status(200).json({
    success: true,
    data: user,
    message:
      "User has been registerd successfully, Please contact the admin to activate your account",
  });
});
