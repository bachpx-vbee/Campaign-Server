const { ObjectId } = require("mongoose").Types;
const Campaign = require("../models/campaign");

const createCampaign = async ({ title, content }) => {
  const campaign = await Campaign.create({
    title,
    content,
    status: "done",
  });
  return campaign;
};

const getCampaigns = async () => {
  const campaigns = await Campaign.find({});
  return campaigns;
};

const findUser = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const user = await User.findById(condition);
    return user;
  }

  if (typeof condition === "object" && condition !== null) {
    const user = await User.findOne(condition);
    return user;
  }

  return null;
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};

const deleteCampaign = async (campaignId) => {
  await Campaign.findByIdAndDelete(campaignId);
};

module.exports = { createCampaign, getCampaigns, deleteCampaign };
