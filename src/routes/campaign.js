const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const campaignController = require("../controllers/campaign");

router.get(
  "/campaign/get-campaigns",
  asyncMiddleware(campaignController.getCampaigns)
);
router.post(
  "/campaign/create-campaign",
  asyncMiddleware(campaignController.createCampaign)
);
router.delete(
  "campaign/delete-campaign/:campaignId",
  asyncMiddleware(campaignController.deleteCampaign)
);

module.exports = router;
