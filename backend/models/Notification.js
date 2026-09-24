const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "Holiday",
            "Membership",
            "General"
        ],
        default: "General"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);