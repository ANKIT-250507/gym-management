const express = require("express");

const router = express.Router();

const {

    protect,

    authorize

} = require("../middleware/authMiddleware");

const {

    createNotification,

    getNotifications,

    getMemberNotifications,

    deleteNotification

} = require("../controllers/notificationController");


// Admin Create Notification
router.post(
    "/create",
    protect,
    authorize("admin"),
    createNotification
);


// Admin Get All Notifications
router.get(
    "/",
    protect,
    authorize("admin"),
    getNotifications
);


// Member Get Notifications
router.get(
    "/member",
    protect,
    authorize("member"),
    getMemberNotifications
);


// Admin Delete Notification
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteNotification
);

module.exports = router;