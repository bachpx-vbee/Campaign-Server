const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const campaignController = require("../controllers/campaign");
const { auth } = require("../middlewares/auth");

router.get(
  "/campaign/get-my-campaigns",
  auth,
  asyncMiddleware(campaignController.getMyCampaigns)
);
router.get(
  "/campaign/get-campaigns",
  asyncMiddleware(campaignController.getCampaigns)
);
router.get(
  "/campaign/get-campaign/:campaignId",
  asyncMiddleware(campaignController.getCampaign)
);
router.post(
  "/campaign/create-campaign",
  auth,
  asyncMiddleware(campaignController.createCampaign)
);
router.delete(
  "/campaign/delete-campaign/:campaignId",
  auth,
  asyncMiddleware(campaignController.deleteCampaign)
);
router.post(
  "/campaign/update-campaign/:campaignId",
  auth,
  asyncMiddleware(campaignController.updateCampaign)
);
router.post(
  "/campaign/handle-request/:campaignId",
  auth,
  asyncMiddleware(campaignController.handleRequest)
);
router.post(
  "/campaign/add-user",
  auth,
  asyncMiddleware(campaignController.addMember)
);
router.post(
  "/campaign/change-member-role",
  auth,
  asyncMiddleware(campaignController.changeMemberRole)
);
router.get(
  "/campaign/get-all-member/:campaignId",
  asyncMiddleware(campaignController.getAllMember)
);
router.delete(
  "/campaign/delete-member",
  auth,
  asyncMiddleware(campaignController.deleteMember)
);

module.exports = router;
