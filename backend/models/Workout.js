const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    workoutName: {
        type: String,
        required: true
    },

    exercises: [
        {
            exerciseName: {
                type: String,
                required: true
            },

            sets: {
                type: Number,
                required: true
            },

            reps: {
                type: Number,
                required: true
            },

            restTime: {
                type: Number,
                required: true
            }
        }
    ],

    day: {
        type: String,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Workout", workoutSchema);