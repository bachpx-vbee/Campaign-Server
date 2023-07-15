const { ObjectId } = require("mongoose").Types;
const Role = require("../models/role");
const { find } = require("./utils/find");
const Permission = require("../models/permission");

const createRole = async (createFields) => {
  const role = await Role.create(createFields);
  return role;
}

const getAllRoles = async (conditions) => {
  const roles = await find(Role, conditions);
  console.log(roles);
  return roles
}

const deleteRole = async (roleId) => {
  await Role.findByIdAndDelete(roleId)
}

const getRoleId = async (conditions) => {
  const result = await Role.findOne(conditions, { _id: 1 });
  const id = result._id;
  return id;
};

const setPermissionsOfRole = async (roleId, permissions) => {
  const roles = await Role.findByIdAndUpdate(roleId, { $set: { permission: permissions } })
  return roles
}

module.exports = {
  getRoleId,
  createRole,
  getAllRoles,
  deleteRole,
  setPermissionsOfRole
};
