const ee_current = require("../controllers/ee_current_controller");
const router = require("express").Router();

router.get("/", ee_current.findAll);

router.post("/", ee_current.create);

module.exports = router;