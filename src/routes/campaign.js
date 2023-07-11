const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const campaignController = require("../controllers/campaign");
const { auth } = require("../middlewares/auth");

router.post(
  "/campaign/create-campaign",
  auth,
  asyncMiddleware(campaignController.createCampaign)
);

router.get(
  "/campaign/get-campaign/:campaignId",
  asyncMiddleware(campaignController.getCampaign)
);

module.exports = router;
