const sequelize = require("../sequelize");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

exports.tableNameCheck = asyncHandler(async (req, res, next) => {
  //   If Table name doesn't exist in DB
  if (!(req.params.tableName in sequelize.models)) {
    //   Change Table Name first letter to upper case
    req.params.tableName =
      req.params.tableName.charAt(0).toUpperCase() +
      req.params.tableName.slice(1);

    // Check Again for table existance
    if (!(req.params.tableName in sequelize.models)) {
      return next(
        new ErrorResponse(
          `Table (${req.params.tableName}) does not exist in database`,
          403
        )
      );
    }
  }
  next();
});
