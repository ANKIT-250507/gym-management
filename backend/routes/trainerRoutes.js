const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    getAllMembers,
    getTrainerWorkouts
} = require("../controllers/trainerController");
// Trainer - Get All Members
router.get(
    "/members",
    protect,
    authorize("trainer", "admin"),
    getAllMembers
);

router.get(
    "/workouts",
    protect,
    authorize("trainer", "admin"),
    getTrainerWorkouts
);
module.exports = router;