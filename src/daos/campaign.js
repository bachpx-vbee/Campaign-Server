const { ObjectId } = require("mongoose").Types;
const Campaign = require("../models/campaign");
const versionDao = require("./version");

const createCampaign = async ({ title, content }) => {
  const campaign = await Campaign.create({
    title,
    content,
  });
  await versionDao.createVersion(campaign.id, title, content);
  return campaign;
};

const getCampaign = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  return campaign;
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
  await versionDao.deleteVersionCampaign(campaignId);
  const result = await Campaign.findByIdAndDelete(campaignId);
  return result;
};

const handleRequest = async (campaignId, action) => {
  switch (action) {
    case "approve":
      const campaignApprove = await Campaign.findByIdAndUpdate(
        campaignId,
        { status: "done" },
        { new: true }
      );
      await versionDao.createVersion(
        campaignApprove.id,
        campaignApprove.title,
        campaignApprove.content
      );
      return campaignApprove;
    case "denial":
      const campaignOldVersion = await versionDao.findLatestVersion(campaignId);
      const campaignDenial = await Campaign.findByIdAndUpdate(
        campaignId,
        {
          title: campaignOldVersion.title,
          content: campaignOldVersion.content,
          status: "done",
        },
        { new: true }
      );
      return campaignDenial;
    default:
      throw new CustomError(errorCodes.BAD_REQUEST);
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  deleteCampaign,
  updateCampaign,
  handleRequest,
  getCampaign,
};
