const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {

    attendanceReport,
    membershipReport,
    stockReport,
    revenueReport,
    membersReport,
    dashboardReport,
    recentMembers

} = require("../controllers/reportController");

router.get(
    "/attendance",
    protect,
    authorize("admin"),
    attendanceReport
);

router.get(
    "/memberships",
    protect,
    authorize("admin"),
    membershipReport
);

router.get(
    "/stock",
    protect,
    authorize("admin"),
    stockReport
);

router.get(
    "/revenue",
    protect,
    authorize("admin"),
    revenueReport
);

router.get(
    "/members",
    protect,
    authorize("admin"),
    membersReport
);

router.get(
    "/dashboard",
    protect,
    authorize("admin"),
    dashboardReport
);

router.get(
    "/recent-members",
    protect,
    authorize("admin"),
    recentMembers
);

module.exports = router;