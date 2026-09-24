const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    createMembership,
    getAllMemberships,
    renewMembership,
    updateMembership,
    deleteMembership,
    getExpiredMemberships,
    getMembershipAlerts
} = require("../controllers/membershipController");

// Admin Create Membership
router.post(
    "/create",
    protect,
    authorize("admin"),
    createMembership
);

// Admin Get All Memberships
router.get(
    "/",
    protect,
    authorize("admin"),
    getAllMemberships
);

// Admin Get Expired Memberships
router.get(
    "/expired",
    protect,
    authorize("admin"),
    getExpiredMemberships
);

// Admin Membership Alerts
router.get(
    "/alerts",
    protect,
    authorize("admin"),
    getMembershipAlerts
);

// Admin Renew Membership
router.put(
    "/:id/renew",
    protect,
    authorize("admin"),
    renewMembership
);

// Admin Update Membership
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateMembership
);

// Admin Delete Membership
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteMembership
);


module.exports = router;