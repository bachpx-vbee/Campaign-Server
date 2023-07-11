const { ObjectId } = require("mongoose").Types;
const Permission = require("../models/permission");

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

module.exports = {
  createPermission,
  getPermission,
  deletePermission,
};
