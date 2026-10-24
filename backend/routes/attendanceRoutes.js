const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    checkIn,
    checkOut,
    getAttendanceHistory,
    getTodayAttendance,
    getAllAttendance,
    getAttendanceDashboard,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

// Member Check-In
router.post(
    "/checkin",
    protect,
    authorize("member"),
    checkIn
);

// Member Check-Out
router.put(
    "/checkout",
    protect,
    authorize("member"),
    checkOut
);

// Member Attendance History
router.get(
    "/history",
    protect,
    authorize("member"),
    getAttendanceHistory
);

// Trainer/Admin Today's Attendance
router.get(
    "/today",
    protect,
    authorize("trainer", "admin"),
    getTodayAttendance
);

// Admin Attendance Dashboard
router.get(
    "/dashboard",
    protect,
    authorize("admin"),
    getAttendanceDashboard
);

// Admin Get All Attendance
router.get(
    "/",
    protect,
    authorize("admin", "trainer"),
    getAllAttendance
);

// Admin Update Attendance
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateAttendance
);

// Admin Delete Attendance
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteAttendance
);

module.exports = router;