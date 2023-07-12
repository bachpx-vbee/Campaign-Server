const { ObjectId } = require("mongoose").Types;
const Permission = require("../models/permission");
const { find } = require("./utils/find");

const createPermission = async (createFields) => {
  const permission = await Permission.create(createFields);
  return permission;
};

const getPermission = async (conditions) => {
  const permission = await Permission.findOne(conditions);
  return permission;
};

const deletePermission = async (permissionId) => {
  await Permission.findByIdAndDelete(permissionId);
};

const getAllPermission = async (conditions) => {
  const permissions = await find(Permission, conditions);
  return permissions;
};

module.exports = {
  createPermission,
  getPermission,
  deletePermission,
  getAllPermission,
};
