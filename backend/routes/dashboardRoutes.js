const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    getDashboard,
    getRecentMembers,
    getChartData
} = require("../controllers/dashboardController");


router.get(
    "/",
    protect,
    authorize("admin"),
    getDashboard
);


router.get(
    "/recent-members",
    protect,
    authorize("admin"),
    getRecentMembers
);

router.get(
    "/charts",
    protect,
    authorize("admin"),
    getChartData
);


module.exports = router;