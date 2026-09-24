const Attendance = require("../models/Attendance");
const Membership = require("../models/Membership");
const Product = require("../models/Product");
const User = require("../models/User");

// Attendance Report
const attendanceReport = async (req, res) => {

    try {

        const attendance = await Attendance.find()
            .populate("member", "name email");

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


// Membership Report
const membershipReport = async (req, res) => {

    try {

        const memberships = await Membership.find()
            .populate("member", "name email");

        res.status(200).json({
            totalMemberships: memberships.length,
            memberships
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Product Stock Report
const stockReport = async (req, res) => {

    try {

        const products = await Product.find();

        const lowStock = products.filter(product => product.stock <= 5);

        res.status(200).json({

            totalProducts: products.length,

            lowStockProducts: lowStock.length,

            products

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const recentMembers = async (req, res) => {

    try {

        const members = await User.find({
            role: "member"
        })
        .select("-password")
        .sort({
            createdAt: -1
        })
        .limit(5);

        res.status(200).json({

            total: members.length,

            members

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Revenue Report
const revenueReport = async (req, res) => {

    try {

        const memberships = await Membership.find();

        let totalRevenue = 0;

        memberships.forEach(membership => {

            totalRevenue += membership.fees;

        });

        res.status(200).json({

            totalRevenue,

            totalMemberships: memberships.length

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Members Report
const membersReport = async (req, res) => {

    try {

        const members = await User.find({
            role: "member"
        }).select("-password");

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


// Dashboard Report
const dashboardReport = async (req, res) => {

    try {

        const totalMembers = await User.countDocuments({
            role: "member"
        });

        const totalProducts = await Product.countDocuments();

        const totalMemberships = await Membership.countDocuments();

        const totalAttendance = await Attendance.countDocuments();

        res.status(200).json({

            totalMembers,

            totalProducts,

            totalMemberships,

            totalAttendance

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    attendanceReport,
    membershipReport,
    stockReport,
    revenueReport,
    membersReport,
    dashboardReport,
    recentMembers

};