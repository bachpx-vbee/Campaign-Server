const { ObjectId } = require("mongoose").Types;
const Member = require("../models/member");

const userCreateCampaign = async (userId, campaignId, roleId) => {
  await Member.create({
    campaignId,
    userId,
    roleId,
  });
};

const addMember = async (userId, campaignId, roleId) => {
  const member = await Member.create({
    campaignId,
    userId,
    roleId,
  });
  return member;
};

const findExistMember = async (userId, campaignId) => {
  const member = await Member.findOne({
    userId,
    campaignId,
  });
  if (member === null) return false;
  return true;
};

const changeMemberRole = async (userId, campaignId, roleId) => {
  const member = await Member.findOneAndUpdate(
    { userId: userId, campaignId: campaignId },
    { $set: { roleId: roleId } },
    { new: true }
  );
  return member;
};

const userFindCampaign = async (userId) => {
  const campaigns = await Member.find({
    userId,
  });
  return campaigns;
};

const getRoleId = async (userId, campaignId) => {
  const campaign = await Member.findOne({
    userId,
    campaignId,
  });
  return campaign.roleId;
};

const deleteCampaign = async (campaignId) => {
  await Member.deleteMany({ campaignId });
};

const deleteMember = async (userId, campaignId) => {
  await Member.deleteOne({ userId, campaignId });
};

const getAllMember = async (campaignId) => {
  const members = await Member.find({
    campaignId,
  });
  return members;
};

module.exports = {
  userCreateCampaign,
  userFindCampaign,
  deleteCampaign,
  getRoleId,
  addMember,
  changeMemberRole,
  findExistMember,
  getAllMember,
  deleteMember,
};
