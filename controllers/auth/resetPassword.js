const crypto = require("crypto");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const { Op } = require("sequelize");
const { sendTokenResponse } = require("./_functions");

// @desc        Reset Password
// @route       PUT /api/v2/auth/resetpassword/:resettoken
// @access      Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await Users.findOne({
    where: {
      resetPasswordToken,
      resetPasswordExpire: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // If user found and token not expired
  // Set new Password
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await Users.update(user.dataValues, { where: { id: user.id } });

  sendTokenResponse(user, 200, res);
});
