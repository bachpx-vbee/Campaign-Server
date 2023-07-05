const { ObjectId } = require("mongoose").Types;
const Member = require("../models/member");

const createMember = async (createFields) => {
  await Member.create(createFields);
};

module.exports = {
  createMember,
};
