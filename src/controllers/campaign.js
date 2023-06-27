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
  const user_id = req.user_id;
  const campaign = await campaignService.createCampaign(user_id, data);
  return res.send({ status: 1, result: { campaign } });
};

const getMyCampaigns = async (req, res) => {
  const user_id = req.user_id;
  const campaigns = await campaignService.getMyCampaigns(user_id);
  return res.send({ status: 1, result: { campaigns } });
};

const deleteCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;
  const user_id = req.user_id;
  const result = await campaignService.deleteCampaign(user_id, campaignId);
  return res.send({ status: 1, result });
};

const updateCampaign = async (req, res) => {
  const campaignId = req.params.campaignId;
  const data = req.body;
  const user_id = req.user_id;
  const campaign = await campaignService.updateCampaign(
    user_id,
    campaignId,
    data
  );
  return res.send({ status: 1, result: { campaign } });
};

const handleRequest = async (req, res) => {
  const campaignId = req.params.campaignId;
  const action = req.body.action;
  const user_id = req.user_id;
  const campaign = await campaignService.handleRequest(
    user_id,
    campaignId,
    action
  );
  return res.send({ status: 1, result: { campaign } });
};

const addMember = async (req, res) => {
  const data = req.body;
  const ownerId = req.user_id;
  const member = await campaignService.addMember(ownerId, data);
  return res.send({ status: 1, result: { member } });
};

const changeMemberRole = async (req, res) => {
  const data = req.body;
  const ownerId = req.user_id;
  const member = await campaignService.changeMemberRole(ownerId, data);
  return res.send({ status: 1, result: { member } });
};

const getAllMember = async (req, res) => {
  const campaignId = req.params.campaignId;
  const members = await campaignService.getAllMember(campaignId);
  return res.send({ status: 1, result: { members } });
};

const deleteMember = async (req, res) => {
  const ownerId = req.user_id;
  const data = req.body;
  await campaignService.deleteMember(ownerId, data);
  return res.send({ status: 1, result: "Success" });
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
  updateCampaign,
  handleRequest,
  getCampaign,
  getMyCampaigns,
  addMember,
  changeMemberRole,
  getAllMember,
  deleteMember,
};
