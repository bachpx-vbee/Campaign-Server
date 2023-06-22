const campaignService = require("../services/campaign");

const getCampaigns = async (req, res) => {
  const campaigns = await campaignService.getCampaigns();
  return res.send({ status: 1, result: { campaigns } });
};

const createCampaign = async (req, res) => {
  const data = req.body;
  const campaign = await campaignService.createCampaign(data);
  return res.send({ status: 1, result: { campaign } });
};

const deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;
  const result = await campaignService.deleteCampaign(campaignId);
  return res.send({ status: 1, result });
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
};
