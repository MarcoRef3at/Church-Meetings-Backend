/*
Set Default Password when no password is provided in the request to be
fist letter of first name followed by first letter of last name followed by '.1234'
eg.
    username: john.smith
    password:js.1234

*/

const setDefaultPassword = (username) => {
  return `${username.split(".")[0][0]}${username.split(".")[1][0]}.1234`;
};

module.exports = setDefaultPassword;
