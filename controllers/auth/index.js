const { forgotPassword } = require("./forgotPassword");
const { getMe } = require("./getMe");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { resetPassword } = require("./resetPassword");

module.exports = {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
};
