const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const campaignController = require("../controllers/campaign");

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
  asyncMiddleware(campaignController.createCampaign)
);
router.delete(
  "/campaign/delete-campaign/:campaignId",
  asyncMiddleware(campaignController.deleteCampaign)
);
router.post(
  "/campaign/update-campaign/:campaignId",
  asyncMiddleware(campaignController.updateCampaign)
);
router.post(
  "/campaign/handle-request/:campaignId",
  asyncMiddleware(campaignController.handleRequest)
);

module.exports = router;
