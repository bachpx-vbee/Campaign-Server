const { ObjectId } = require("mongoose").Types;
const Version = require("../models/version");

const createVersion = async (campaignId, title, content) => {
  const latestVersion = await Version.findOne({ campaignId }).sort({
    version: -1,
  });

  const campaignVersion = await Version.create({
    campaignId,
    title,
    content,
    version: latestVersion ? latestVersion.version + 1 : 1,
  });
  return campaignVersion;
};

const findLatestVersion = async (campaignId) => {
  const version = await Version.findOne({ campaignId }).sort({
    version: -1,
  });
  return version;
};

const deleteVersionCampaign = async (campaignId) => {
  await Version.deleteMany({ campaignId });
};

module.exports = {
  createVersion,
  findLatestVersion,
  deleteVersionCampaign,
};
