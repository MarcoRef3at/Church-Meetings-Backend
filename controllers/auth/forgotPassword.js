const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const sendEmail = require("../../utils/sendEmail");
const { getResetPasswordToken } = require("./_functions");
const sequelize = require("../../sequelize");
const { Users } = sequelize.models;

/* @desc        **Forget Password**
                1-Check for email or username existance in database
                2-If User found Create a token with expiry date and save it to user's data in database
                3-Send Email to User with the reset token URL
                4-If Email failed to send , delete the created token and save the user data again with undefined token
*/
// @route       Post /api/v2/auth/forgotpassword
// @access      Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // Get Email or Username From Request Body
  const { email, username } = req.body;

  // Set Email or Username to emailOrUsername Varialble
  let emailOrUsername = email ? { email } : { username };

  // Find and check for user existence in DB
  const user = await Users.findOne({
    where: {
      ...emailOrUsername,
    },
  });

  // If Requested User Not Found
  if (!user) {
    return next(
      new ErrorResponse("There is no user with that email/username", 404)
    );
  }

  // If Found
  //  Get reset token
  const resetToken = getResetPasswordToken(user);

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v2/auth/resetpassword/${resetToken}`;

  // Create A Message for the Email
  const message = `${process.env.FORGET_PASSWORD_EMAIL_BODY} \n\n ${resetUrl}`;

  try {
    // Update User data (resetPasswordToken and resetPasswordExpire )
    saveUser(user);
    await sendEmail({
      email: user.email,
      subject: process.env.FORGET_PASSWORD_SUBJECT,
      message,
    });
    res.status(200).json({
      success: true,
      data: `Email Sent To ${user.email}`,
      resetToken,
    });
  } catch (error) {
    console.log("Sending Email error:", error);
    // If Failed to send Email
    // Reset token and save user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    saveUser(user);
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

const saveUser = async (user) => {
  await Users.update(
    {
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpire: user.resetPasswordExpire,
    },
    { where: { id: user.id } }
  )
    .then((r) => {
      console.log("userUpdated:", r);
    })
    .catch((e) => console.log("userUpdate Error", e.message));
};
