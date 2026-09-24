const User = require("../models/User");
const Workout = require("../models/Workout");
// Get All Members
const getAllMembers = async (req, res) => {

    try {

        const members = await User.find({ role: "member" })
            .select("-password");

        res.status(200).json({
            totalMembers: members.length,
            members
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Get All Workouts Created By Trainer
const getTrainerWorkouts = async (req, res) => {

    try {

        let query = {};

        if (req.user.role === "trainer") {

            query.trainer = req.user.id;

        }

        const workouts = await Workout.find(query)
            .populate("member", "name email")
            .populate("trainer", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            totalWorkouts: workouts.length,
            workouts
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getAllMembers,
    getTrainerWorkouts
};