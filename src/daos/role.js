const { ObjectId } = require("mongoose").Types;
const Role = require("../models/role");

const checkRole = async (id) => {
  const role = await Role.findById(id);
  return role._doc.name;
};

const getRoleId = async (name) => {
  const id = await Role.findOne({
    name,
  });
  return id._id;
};

module.exports = {
  checkRole,
  getRoleId,
};
