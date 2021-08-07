const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const redis = require("../../config/redis");

// Generate logged in user token by user id
const getSignedJwtToken = (user) => {
  // console.log("user:", user.role);
  // Initiate payload
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Generate token, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = getSignedJwtToken(user);

  // Cookies option
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    //httpOnly: true
  };

  // Send Cookies over HTTPS
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  const All_Permissions = user.All_Permissions || [];
  redis.hmset(
    user.id,
    "All_Permissions",
    JSON.stringify(All_Permissions),
    "isActive",
    user.isActive
  );

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
    All_Permissions,
  });
};
exports.sendTokenResponse = sendTokenResponse;
// Match Password entered with hashed one
const matchPassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
exports.matchPassword = matchPassword;
const getPermissionId = async (permissionNames) => {
  let permissionIds = [];
  await Promise.all(
    permissionNames.map(async (p) => {
      let permission = await Permissions.findOne({
        where: { name: p },
      });
      //To Handle misspelled permission names
      //And Repeated Permissions
      if (permission && !permissionIds.includes(permission.dataValues.id)) {
        return permissionIds.push(permission.dataValues.id);
      }
    })
  );
  return permissionIds;
};
const getPermissionNames = async (permissionIds) => {
  let permissionNames = [];
  await Promise.all(
    permissionIds.map(async (id) => {
      let permission = await Permissions.findOne({
        where: { id },
      });
      //To Handle misspelled permission names
      //And Repeated Permissions
      if (permission && !permissionNames.includes(permission.dataValues.name)) {
        return permissionNames.push(permission.dataValues.name);
      }
    })
  );
  return permissionNames;
};
const getResetPasswordToken = (user) => {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
exports.getResetPasswordToken = getResetPasswordToken;
