const campaignDao = require("../daos/campaign");
const campaign = require("../models/campaign");

const getCampaigns = async () => {
  const campaigns = await campaignDao.getCampaigns();
  return campaigns;
};

const createCampaign = async ({ title, content }) => {
  const campaign = await campaignDao.createCampaign({ title, content });
  return campaign;
};

const deleteCampaign = async (campaignId) => {
  const result = await campaignDao.deleteCampaign(campaignId);
  return result;
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
};
