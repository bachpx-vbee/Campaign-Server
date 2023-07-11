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

module.exports = {
  createPermission,
  getPermission,
};
