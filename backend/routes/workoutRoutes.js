const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    createWorkout,
    getMemberWorkout,
    updateWorkout,
    deleteWorkout,
    getAllWorkouts,
    completeMemberWorkout
} = require("../controllers/workoutController");

// Trainer creates workout
router.post(
    "/create",
    protect,
    authorize("trainer", "admin"),
    createWorkout
);

router.get(
    "/",
    protect,
    authorize("trainer", "admin"),
    getAllWorkouts
);

// Member views workout
router.get(
    "/member",
    protect,
    authorize("member"),
    getMemberWorkout
);

router.put(
    "/member/:id/complete",
    protect,
    authorize("member"),
    completeMemberWorkout
);

// Trainer Update Workout
router.put(
    "/:id",
    protect,
    authorize("trainer", "admin"),
    updateWorkout
);

// Trainer Delete Workout
router.delete(
    "/:id",
    protect,
    authorize("trainer", "admin"),
    deleteWorkout
);

module.exports = router;