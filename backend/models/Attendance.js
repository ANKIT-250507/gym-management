const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    checkIn: {
        type: Date,
        default: Date.now
    },

    checkOut: {
        type: Date
    },

    duration: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Attendance", attendanceSchema);