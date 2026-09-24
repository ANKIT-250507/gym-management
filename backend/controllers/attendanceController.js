const Attendance = require("../models/Attendance");

// Member Check-In
const checkIn = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const alreadyCheckedIn = await Attendance.findOne({
            member: req.user.id,
            checkIn: { $gte: today }
        });

        if (alreadyCheckedIn) {
            return res.status(400).json({
                message: "You have already checked in today."
            });
        }

        const attendance = await Attendance.create({
            member: req.user.id
        });

        res.status(201).json({
            message: "Check-In Successful",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

// Member Check-Out
const checkOut = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            member: req.user.id,
            checkIn: { $gte: today }
        });

        if (!attendance) {
            return res.status(404).json({
                message: "Check-In not found"
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                message: "Already Checked Out"
            });
        }

        attendance.checkOut = new Date();

        const duration =
            (attendance.checkOut - attendance.checkIn) / (1000 * 60);

        attendance.duration = Math.round(duration);

        await attendance.save();

        res.status(200).json({
            message: "Check-Out Successful",
            attendance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Member Attendance History
const getAttendanceHistory = async (req, res) => {

    try {

        const attendance = await Attendance.find({
            member: req.user.id
        }).sort({ checkIn: -1 });

        res.status(200).json({
            totalRecords: attendance.length,
            attendance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Today's Attendance
const getTodayAttendance = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const attendance = await Attendance.find({
            checkIn: {
                $gte: today,
                $lt: tomorrow
            }
        }).populate(
            "member",
            "name email phone"
        );

        res.status(200).json({
            totalPresent: attendance.length,
            attendance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Attendance (Admin)
const getAllAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find()
            .populate("member", "name email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            totalRecords: attendance.length,
            attendance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Attendance Dashboard
const getAttendanceDashboard = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayAttendance = await Attendance.find({
            checkIn: {
                $gte: today,
                $lt: tomorrow
            }
        });

        const totalMembersToday = todayAttendance.length;

        const checkedOut = todayAttendance.filter(
            attendance => attendance.checkOut
        ).length;

        const currentlyInsideGym = totalMembersToday - checkedOut;

        let totalDuration = 0;

        todayAttendance.forEach(attendance => {
            totalDuration += attendance.duration || 0;
        });

        const averageWorkoutDuration =
            checkedOut > 0
                ? Math.round(totalDuration / checkedOut)
                : 0;

        res.status(200).json({
            totalMembersToday,
            checkedOut,
            currentlyInsideGym,
            averageWorkoutDuration
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        attendance.status = req.body.status || attendance.status;
        if (req.body.checkIn) {
            attendance.checkIn = req.body.checkIn;
        }

        if (req.body.checkOut) {
            attendance.checkOut = req.body.checkOut;
        }

        if (attendance.checkOut) {

            const duration =
                (new Date(attendance.checkOut) - new Date(attendance.checkIn)) /
                (1000 * 60);

            attendance.duration = Math.round(duration);

        }

        await attendance.save();

        res.status(200).json({
            message: "Attendance Updated Successfully",
            attendance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        await attendance.deleteOne();

        res.status(200).json({
            message: "Attendance Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    checkIn,
    checkOut,
    getAttendanceHistory,
    getTodayAttendance,
    getAllAttendance,
    getAttendanceDashboard,
    updateAttendance,
    deleteAttendance
};