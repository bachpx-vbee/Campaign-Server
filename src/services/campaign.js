const campaignDao = require("../daos/campaign");
const memberDao = require("../daos/member");
const versionDao = require("../daos/version");
const userDao = require("../daos/user");
const roleDao = require("../daos/role");
const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");

const getCampaigns = async () => {
  const campaigns = await campaignDao.getCampaigns();
  return campaigns;
};

const getMyCampaigns = async (user_id) => {
  const campaigns = await memberDao.userFindCampaign(user_id);
  const listCampaigns = await campaignDao.getMyCampaigns(campaigns);
  return listCampaigns;
};

const getCampaign = async (campaignId) => {
  const campaign = await campaignDao.getCampaign(campaignId);
  return campaign;
};

const createCampaign = async (user_id, { title, content }) => {
  const campaign = await campaignDao.createCampaign(user_id, {
    title,
    content,
  });
  await versionDao.createVersion(campaign.id, title, content);
  const roleId = await roleDao.getRoleId("owner");
  await memberDao.userCreateCampaign(user_id, campaign.id, roleId);
  return campaign;
};

const deleteCampaign = async (userId, campaignId) => {
  const roleId = await memberDao.getRoleId(userId, campaignId);
  const role = await roleDao.checkRole(roleId);
  if (role === "owner") {
    await versionDao.deleteVersionCampaign(campaignId);
    await memberDao.deleteCampaign(campaignId);
    const result = await campaignDao.deleteCampaign(campaignId);
    return result;
  }
  throw CustomError(errorCodes.UNAUTHORIZED);
};

const updateCampaign = async (userId, campaignId, data) => {
  const roleId = await memberDao.getRoleId(userId, campaignId);
  const role = await roleDao.checkRole(roleId);
  switch (role) {
    case "owner":
      await campaignDao.updateCampaign(campaignId, data);
      const campaignApprove = await campaignDao.updateCampaignAfterRequest(
        campaignId,
        {
          status: "done",
        }
      );
      await versionDao.createVersion(
        campaignId,
        campaignApprove.title,
        campaignApprove.content
      );
      return campaignApprove;

    case "admin":
      const campaign = await campaignDao.updateCampaign(campaignId, data);
      return campaign;

    default:
      throw new CustomError(errorCodes.UNAUTHORIZED);
  }
};

const handleRequest = async (userId, campaignId, action) => {
  const roleId = await memberDao.getRoleId(userId, campaignId);
  const role = await roleDao.checkRole(roleId);
  if (role === "owner") {
    switch (action) {
      case "approve":
        const campaignApprove = await campaignDao.updateCampaignAfterRequest(
          campaignId,
          {
            status: "done",
          }
        );
        await versionDao.createVersion(
          campaignApprove.id,
          campaignApprove.title,
          campaignApprove.content
        );
        return campaignApprove;

      case "denial":
        const campaignOldVersion = await versionDao.findLatestVersion(
          campaignId
        );
        const campaignDenial = campaignDao.updateCampaignAfterRequest(
          campaignId,
          {
            title: campaignOldVersion.title,
            content: campaignOldVersion.content,
            status: "done",
          }
        );
        return campaignDenial;

      default:
        throw new CustomError(errorCodes.BAD_REQUEST);
    }
  }
  throw CustomError(errorCodes.UNAUTHORIZED);
};

const addMember = async (ownerId, { campaignId, email, role }) => {
  const ownerRoleId = await memberDao.getRoleId(ownerId, campaignId);
  const ownerRole = await roleDao.checkRole(ownerRoleId);
  if (ownerRole === "owner") {
    const user = await userDao.findUser({ email });
    if (user) {
      const checkExistedMember = await memberDao.findExistMember(
        user.id,
        campaignId
      );
      if (checkExistedMember) throw new CustomError(errorCodes.USER_EXISTS);
      const roleId = await roleDao.getRoleId(role);
      const member = await memberDao.addMember(user.id, campaignId, roleId);
      return member;
    }
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }
  throw new CustomError(errorCodes.UNAUTHORIZED);
};

const changeMemberRole = async (ownerId, { campaignId, userId, role }) => {
  const ownerRoleId = await memberDao.getRoleId(ownerId, campaignId);
  const ownerRole = await roleDao.checkRole(ownerRoleId);
  if (ownerRole === "owner") {
    const roleId = await roleDao.getRoleId(role);
    const member = await memberDao.changeMemberRole(userId, campaignId, roleId);
    return member;
  }
  throw new CustomError(errorCodes.UNAUTHORIZED);
};

const getAllMember = async (campaignId) => {
  const members = await memberDao.getAllMember(campaignId);
  const memberList = [];
  await Promise.all(
    members.map(async (member) => {
      const user = await userDao.findUser(member.userId);
      const role = await roleDao.checkRole(member.roleId);
      user._doc.role = role;
      memberList.push(user);
    })
  );
  return memberList;
};

const deleteMember = async (ownerId, { userId, campaignId }) => {
  const ownerRoleId = await memberDao.getRoleId(ownerId, campaignId);
  const ownerRole = await roleDao.checkRole(ownerRoleId);
  if (ownerRole === "owner") {
    const member = await memberDao.deleteMember(userId, campaignId);
    return member;
  }
  throw CustomError(errorCodes.UNAUTHORIZED);
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
