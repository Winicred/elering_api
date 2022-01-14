const latest = require("../controllers/latest_price_controller");
const router = require("express").Router();

router.get("/:region", latest.findAll);

module.exports = router;