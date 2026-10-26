const User = require("../models/User");
const Membership = require("../models/Membership");
const Attendance = require("../models/Attendance");
const Product = require("../models/Product");
const Diet = require("../models/Diet");
const Notification = require("../models/Notification");


const getDashboard = async (req, res) => {

    try {

        const totalMembers = await User.countDocuments({
            role: "member"
        });

        const totalTrainers = await User.countDocuments({
            role: "trainer"
        });

        const totalProducts = await Product.countDocuments();

        const totalDietPlans = await Diet.countDocuments();

        const totalNotifications = await Notification.countDocuments();

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);

        tomorrow.setDate(today.getDate() + 1);

        const todayAttendance = await Attendance.countDocuments({
            checkIn: {
                $gte: today,
                $lt: tomorrow
            }
        });

        const activeMemberships = await Membership.countDocuments({
            expiryDate: {
                $gte: new Date()
            }
        });

        const expiredMemberships = await Membership.countDocuments({
            expiryDate: {
                $lt: new Date()
            }
        });

        const lowStockProducts = await Product.countDocuments({
            stock: {
                $lte: 5
            }
        });

        res.status(200).json({

            dashboard: {

                totalMembers,

                totalTrainers,

                activeMemberships,

                expiredMemberships,

                todayAttendance,

                totalProducts,

                lowStockProducts,

                totalDietPlans,

                totalNotifications

            }

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Recent Members

const getRecentMembers = async (req, res) => {

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

// Monthly Chart Data
const getChartData = async (req, res) => {
    try {
        const year = new Date().getFullYear();

        const membersGrowth = await User.aggregate([
            {
                $match: {
                    role: "member",
                    createdAt: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year + 1, 0, 1)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const monthlyRevenue = await Membership.aggregate([
            {
                $match: {
                    paymentStatus: "Paid",
                    startDate: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year + 1, 0, 1)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$startDate" },
                    total: { $sum: "$fees" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const memberData = Array(12).fill(0);
        const revenueData = Array(12).fill(0);

        membersGrowth.forEach(item => {
            memberData[item._id - 1] = item.total;
        });

        monthlyRevenue.forEach(item => {
            revenueData[item._id - 1] = item.total;
        });

        res.status(200).json({
            year,
            labels: months,
            membersGrowth: memberData,
            monthlyRevenue: revenueData
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboard,
    getRecentMembers,
    getChartData
};