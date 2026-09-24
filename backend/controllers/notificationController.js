const Notification = require("../models/Notification");


// Admin Create Notification
const createNotification = async (req, res) => {

    try {

        const notification = await Notification.create({

            title: req.body.title,

            message: req.body.message,

            type: req.body.type,

            createdBy: req.user.id

        });

        res.status(201).json({

            message: "Notification Created",

            notification

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Get All Notifications
const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find()

            .populate(
                "createdBy",
                "name"
            )

            .sort({
                createdAt: -1
            });

        res.status(200).json({

            total: notifications.length,

            notifications

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Member View Notifications
const getMemberNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find()

            .sort({
                createdAt: -1
            });

        res.status(200).json({

            total: notifications.length,

            notifications

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Admin Delete Notification
const deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                message: "Notification not found"

            });

        }

        await notification.deleteOne();

        res.status(200).json({

            message: "Notification Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createNotification,

    getNotifications,

    getMemberNotifications,

    deleteNotification

};