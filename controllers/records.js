const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sequelize = require("../sequelize");

// @des         Get All Records
// @route       GET /api/v2/:TableName
// @access      Private/Admin
exports.getRecords = asyncHandler(async (req, res, next) => {
  sequelize.models[req.params.tableName].findAll().then((table) => {
    res.status(200).json({ success: true, data: table });
  });
});

// @des         Get Single Record
// @route       GET /api/v2/:TableName/:id
// @access      Private/Admin
exports.getRecord = asyncHandler(async (req, res, next) => {
  const record = await sequelize.models[req.params.tableName].findByPk(
    req.params.id
  );
  if (!record) {
    return next(
      new ErrorResponse(`Record with ID ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: record });
});

// @des         Create a Record
// @route       POST /api/v2/:TableName
// @access      Private/Admin
exports.addRecord = asyncHandler(async (req, res, next) => {
  const record = await sequelize.models[req.params.tableName].create(req.body);
  res.status(201).json({ success: true, data: record });
});

// @des         Update a Record
// @route       PUT /api/v2/:TableName/:id
// @access      Private/Admin
exports.updateRecord = asyncHandler(async (req, res, next) => {
  sequelize.models[req.params.tableName]
    .update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      sequelize.models[req.params.tableName]
        .findByPk(req.params.id)
        .then((record) => {
          if (!record) {
            return next(
              new ErrorResponse(
                `Record with ID ${req.params.id} not found`,
                404
              )
            );
          } else {
            res.status(200).json({ success: true, data: record });
          }
        });
    })
    .catch((e) => {
      return next(new ErrorResponse(e.message, 404));
    });
});

// @des         Delete a Record
// @route       DELETE /api/v2/:TableName/:id
// @access      Private/Admin
exports.deleteRecord = asyncHandler(async (req, res, next) => {
  sequelize.models[req.params.tableName]
    .destroy({ where: { id: req.params.id } })
    .then((rows) => {
      if (rows == 0) {
        return next(
          new ErrorResponse(`Record with ID ${req.params.id} not found`, 404)
        );
      }

      res.status(200).json({
        success: true,
        data: `${rows} ${rows > 1 ? "records" : "record"} successfully deleted`,
      });
    });
});
