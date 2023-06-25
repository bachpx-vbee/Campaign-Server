const campaignService = require("../services/campaign");

const getCampaigns = async (req, res) => {
  const campaigns = await campaignService.getCampaigns();
  return res.send({ status: 1, result: { campaigns } });
};

const getCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;
  const campaign = await campaignService.getCampaign(campaignId);
  return res.send({ status: 1, result: { campaign } });
};

const createCampaign = async (req, res) => {
  const data = req.body;
  const campaign = await campaignService.createCampaign(data);
  return res.send({ status: 1, result: { campaign } });
};

const deleteCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;
  const result = await campaignService.deleteCampaign(campaignId);
  return res.send({ status: 1, result });
};

const updateCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;
  const data = req.body;
  const campaign = await campaignService.updateCampaign(campaignId, data);
  return res.send({ status: 1, result: { campaign } });
};

const handleRequest = async (req, res) => {
  const campaignId = req.params.campaignId;
  const action = req.body.action;
  const campaign = await campaignService.handleRequest(campaignId, action);
  return res.send({ status: 1, result: { campaign } });
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
  updateCampaign,
  handleRequest,
  getCampaign,
};
