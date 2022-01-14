const day_ahead = require("../controllers/day_ahead_controller");
const router = require("express").Router();

router.get("/:start_date/:end_date/:region", day_ahead.findAll);

module.exports = router;