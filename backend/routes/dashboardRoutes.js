const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    getDashboard,
    getRecentMembers
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


module.exports = router;