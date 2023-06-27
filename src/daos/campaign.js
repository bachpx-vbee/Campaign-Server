const { ObjectId } = require("mongoose").Types;
const Campaign = require("../models/campaign");

const createCampaign = async (user_id, { title, content }) => {
  const campaign = await Campaign.create({
    title,
    content,
  });
  return campaign;
};

const getCampaign = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  return campaign;
};

const getMyCampaigns = async (campaigns) => {
  const campaignIds = campaigns.map((campaign) => campaign.campaignId);
  const campaignPromises = campaignIds.map((id) => Campaign.findById(id));
  const campaignDetails = await Promise.all(campaignPromises);

  return campaignDetails;
};

const getCampaigns = async () => {
  const campaigns = await Campaign.find({});
  return campaigns;
};

const updateCampaign = async (campaignId, data) => {
  const campaign = await Campaign.findByIdAndUpdate(
    campaignId,
    { ...data, status: "reviewing" },
    { new: true }
  );
  return campaign;
};

const deleteCampaign = async (campaignId) => {
  const result = await Campaign.findByIdAndDelete(campaignId);
  return result;
};

const updateCampaignAfterRequest = async (campaignId, data) => {
  const updateCampaign = await Campaign.findByIdAndUpdate(campaignId, data, {
    new: true,
  });
  return updateCampaign;
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
  updateCampaign,
  getCampaign,
  getMyCampaigns,
  updateCampaignAfterRequest,
};
