const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    planName: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    fees: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    },

    startDate: {
        type: Date,
        default: Date.now
    },

    expiryDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Membership", membershipSchema);