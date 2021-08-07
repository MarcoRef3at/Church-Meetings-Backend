const express = require("express");
const {
  getRecord,
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/records");
const router = express.Router();

const { protect } = require("../middleware/auth");
const { tableNameCheck } = require("../middleware/tableName");

router
  .route("/:tableName")
  .get(protect, tableNameCheck, getRecords)
  .post(protect, tableNameCheck, addRecord);

router
  .route("/:tableName/:id")
  .get(tableNameCheck, getRecord)
  .put(protect, tableNameCheck, updateRecord)
  .delete(protect, tableNameCheck, deleteRecord);

module.exports = router;
