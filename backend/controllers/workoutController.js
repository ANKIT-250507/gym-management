const Workout = require("../models/Workout");
const User = require("../models/User");

// Create Workout
const createWorkout = async (req, res) => {

    try {

        const {
            member,
            workoutName,
            exercises,
            day
        } = req.body;

        // Validation
        if (!member || !workoutName || !exercises || !day) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check Member Exists
        const memberUser = await User.findById(member);

        if (!memberUser) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        const workout = await Workout.create({
            member,
            trainer: req.user.id,
            workoutName,
            exercises,
            day
        });

        res.status(201).json({
            success: true,
            message: "Workout Assigned Successfully",
            data: workout
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Member View Workout
const getMemberWorkout = async (req, res) => {

    try {

        const workouts = await Workout.find({
            member: req.user.id
        }).populate("trainer", "name email");

        res.status(200).json({
            success: true,
            total: workouts.length,
            data: workouts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Update Workout
const updateWorkout = async (req, res) => {

    try {

        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        // Trainer can update own workout, Admin can update any workout
        if (
            req.user.role !== "admin" &&
            workout.trainer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Workout Updated Successfully",
            data: updatedWorkout
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Workout
const deleteWorkout = async (req, res) => {

    try {

        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        // Trainer can delete own workout, Admin can delete any workout
        if (
            req.user.role !== "admin" &&
            workout.trainer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        await workout.deleteOne();

        res.status(200).json({
            success: true,
            message: "Workout Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Workouts (Trainer/Admin)

const getAllWorkouts = async (req, res) => {

    try {

        const workouts = await Workout.find()

            .populate("member", "name email")

            .populate("trainer", "name");

        res.status(200).json({

            success: true,

            total: workouts.length,

            data: workouts

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Member Complete Workout
const completeMemberWorkout = async (req, res) => {
    try {

        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        // Check workout belongs to logged-in member
        if (workout.member.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only complete your own workout"
            });
        }

        // Already completed
        if (workout.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Workout is already completed"
            });
        }

        workout.status = "Completed";

        await workout.save();

        res.status(200).json({
            success: true,
            message: "Workout marked as completed",
            data: workout
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createWorkout,
    getMemberWorkout,
    updateWorkout,
    deleteWorkout,
    getAllWorkouts,
    completeMemberWorkout
};