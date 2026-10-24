const Membership = require("../models/Membership");
const User = require("../models/User");

// Create Membership
const createMembership = async (req, res) => {

    try {

        const {
            member,
            planName,
            duration,
            fees,
            paymentStatus
        } = req.body;

        const memberExists = await User.findById(member);

        if (!memberExists || memberExists.role !== "member") {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + duration);

        const membership = await Membership.create({

            member,
            planName,
            duration,
            fees,
            paymentStatus,
            expiryDate

        });

        res.status(201).json({
            message: "Membership Created Successfully",
            membership
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Memberships
const getAllMemberships = async (req, res) => {

    try {

        const memberships = await Membership.find()
            .populate("member", "name email phone");

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

// Renew Membership
const renewMembership = async (req, res) => {

    try {

        const membership = await Membership.findById(req.params.id);

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        const {
            duration,
            fees,
            paymentStatus
        } = req.body;

        membership.duration = duration || membership.duration;
        membership.fees = fees || membership.fees;
        membership.paymentStatus = paymentStatus || membership.paymentStatus;

        const expiryDate = new Date(membership.expiryDate);
        expiryDate.setMonth(expiryDate.getMonth() + duration);

        membership.expiryDate = expiryDate;

        await membership.save();

        res.status(200).json({
            message: "Membership Renewed Successfully",
            membership
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Membership
const updateMembership = async (req, res) => {

    try {

        const membership = await Membership.findById(req.params.id);

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        const updatedMembership = await Membership.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        res.status(200).json({

            message: "Membership Updated Successfully",

            membership: updatedMembership

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Delete Membership
const deleteMembership = async (req, res) => {

    try {

        const membership = await Membership.findById(req.params.id);

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        await membership.deleteOne();

        res.status(200).json({
            message: "Membership Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Expired Memberships
const getExpiredMemberships = async (req, res) => {

    try {

        const today = new Date();

        const memberships = await Membership.find({

            expiryDate: {
                $lt: today
            }

        }).populate("member", "name email phone");

        res.status(200).json({

            totalExpired: memberships.length,

            memberships

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Membership Alerts
const getMembershipAlerts = async (req, res) => {

    try {

        const today = new Date();

        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const memberships = await Membership.find()
            .populate("member", "name email");

        const alerts = memberships.map((membership) => {

            const expiry = new Date(membership.expiryDate);

            const daysLeft = Math.ceil(
                (expiry - today) / (1000 * 60 * 60 * 24)
            );

            let status = "Active";

            if (daysLeft < 0) {
                status = "Expired";
            } else if (daysLeft <= 7) {
                status = "Expiring Soon";
            }

            return {

                member: membership.member.name,

                email: membership.member.email,

                planName: membership.planName,

                expiryDate: membership.expiryDate,

                daysLeft,

                status

            };

        });

        res.status(200).json({

            totalAlerts: alerts.length,

            alerts

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Member: Get My Membership
const getMyMembership = async (req, res) => {
    try {
        const Membership = require("../models/Membership");

        const membership = await Membership.find({
            member: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            membership
        });
    } catch (error) {
        console.error("Get My Membership Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch membership"
        });
    }
};


module.exports = {
    createMembership,
    getAllMemberships,
    renewMembership,
    updateMembership,
    deleteMembership,
    getExpiredMemberships,
    getMembershipAlerts,
    getMyMembership
};