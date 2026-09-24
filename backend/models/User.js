const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "trainer", "member"],
            default: "member"
        },
        phone: {
            type: String,
            default: ""
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: "Male"
        },

        age: {
            type: Number
        },

        height: {
            type: Number
        },

        weight: {
            type: Number
        },

        goal: {
            type: String,
            enum: ["Weight Loss", "Muscle Gain", "Maintain Fitness"],
            default: "Maintain Fitness"
        },

        activityLevel: {
            type: String,
            enum: [
                "Sedentary",
                "Lightly Active",
                "Moderately Active",
                "Very Active",
                "Extra Active"
            ],
            default: "Sedentary"
        },

        profileImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);