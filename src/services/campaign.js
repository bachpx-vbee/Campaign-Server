const campaignDao = require("../daos/campaign");
const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");

const getCampaigns = async () => {
  const campaigns = await campaignDao.getCampaigns();
  return campaigns;
};

const getCampaign = async (campaignId) => {
  const campaign = await campaignDao.getCampaign(campaignId);
  return campaign;
};

const createCampaign = async ({ title, content }) => {
  const campaign = await campaignDao.createCampaign({ title, content });
  return campaign;
};

const deleteCampaign = async (campaignId) => {
  const result = await campaignDao.deleteCampaign(campaignId);
  if (!result) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  return result;
};

const updateCampaign = async (campaignId, data) => {
  const campaign = await campaignDao.updateCampaign(campaignId, data);
  return campaign;
};

const handleRequest = async (campaignId, action) => {
  const campaign = await campaignDao.handleRequest(campaignId, action);
  return campaign;
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
  updateCampaign,
  handleRequest,
  getCampaign,
};
