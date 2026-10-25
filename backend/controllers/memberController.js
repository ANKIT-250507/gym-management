const User = require("../models/User");
const bcrypt = require("bcryptjs");
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const createMember = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            age,
            gender,
            height,
            weight,
            goal,
            activityLevel
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Member already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const member = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            age,
            gender,
            height,
            weight,
            goal,
            activityLevel,
            role: "member"
        });

        res.status(201).json({
            message: "Member created successfully",
            member
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createTrainer = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const trainer = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            phone: phone || "",
            role: "trainer"
        });

        return res.status(201).json({
            success: true,
            message: "Trainer created successfully",
            trainer: {
                id: trainer._id,
                name: trainer.name,
                email: trainer.email,
                phone: trainer.phone,
                role: trainer.role
            }
        });

    } catch (error) {
        console.error("Create Trainer Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create trainer"
        });
    }
};

const getAllMembers = async (req, res) => {
    try {

        console.log("GET ALL MEMBERS API HIT");

        const members = await User.find({
            role: "member"
        }).select("-password");

        console.log("Members:", members);

        res.status(200).json(members);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            age,
            gender,
            height,
            weight,
            goal,
            activityLevel
        } = req.body;
        if (
            !age ||
            !height ||
            !weight ||
            !phone ||
            !gender ||
            !goal ||
            !activityLevel
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        } if (age <= 0 || height <= 0 || weight <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid age, height or weight"
            });
        }
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.height = height || user.height;
        user.weight = weight || user.weight;
        user.goal = goal || user.goal;
        user.activityLevel = activityLevel || user.activityLevel;

        await user.save();

        res.status(200).json({
            message: "Profile Updated Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const updateMember = async (req, res) => {
    try {

        const member = await User.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        const {
            name,
            email,
            phone,
            age,
            gender,
            height,
            weight,
            goal,
            activityLevel
        } = req.body;

        member.name = name || member.name;
        member.email = email || member.email;
        member.phone = phone || member.phone;
        member.age = age || member.age;
        member.gender = gender || member.gender;
        member.height = height || member.height;
        member.weight = weight || member.weight;
        member.goal = goal || member.goal;
        member.activityLevel = activityLevel || member.activityLevel;

        await member.save();

        res.status(200).json({
            message: "Member Updated Successfully",
            member
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteMember = async (req, res) => {

    try {

        const member = await User.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        await member.deleteOne();

        res.status(200).json({
            message: "Member Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createMember,
    createTrainer,
    getProfile,
    updateProfile,
    getAllMembers,
    updateMember,
    deleteMember
};