const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const permissionController = require("../controllers/permission");
const { auth } = require("../middlewares/auth");
const { createPermissionValidate } = require("../validations/permission");

router.post(
  "/permission/create-permission",
  auth,
  createPermissionValidate,
  asyncMiddleware(permissionController.createPermission)
);

module.exports = router;
