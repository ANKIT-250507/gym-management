const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    calculateBMI,
    calculateProtein,
    calculateCalories
} = require("../controllers/healthController");

router.get(
    "/bmi",
    protect,
    authorize("member"),
    calculateBMI
);

router.get(
    "/protein",
    protect,
    authorize("member"),
    calculateProtein
);

router.get(
    "/calories",
    protect,
    authorize("member"),
    calculateCalories
);

module.exports = router;