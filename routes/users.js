const express = require("express");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  updateUserPermissions,
} = require("../controllers/users/index");
const router = express.Router();

const { protect } = require("../middleware/auth");
const {
  authorizedPermissions,
} = require("../middleware/authorizedPermissions");

router
  .route("/")
  .get(protect, authorizedPermissions("getUsers"), getUsers)
  .post(protect, authorizedPermissions("addUser"), addUser);

router
  .route("/:id")
  .get(protect, authorizedPermissions("getUser"), getUser)
  .put(protect, authorizedPermissions("updateUser"), updateUser)
  .delete(protect, authorizedPermissions("deleteUser"), deleteUser);
router
  .route("/:id/permissions")
  .put(
    protect,
    authorizedPermissions("updateUserPermissions"),
    updateUserPermissions
  );

module.exports = router;
