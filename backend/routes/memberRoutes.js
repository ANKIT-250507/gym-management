const express = require("express");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    createMember,
    getProfile,
    updateProfile,
    getAllMembers,
    updateMember,
    deleteMember
} = require("../controllers/memberController");

const router = express.Router();

router.post(
    "/create",
    protect,
    authorize("admin"),
    createMember
);

router.get(
    "/profile",
    protect,
    authorize("member"),
    getProfile
);

router.put(
    "/profile",
    protect,
    authorize("member"),
    updateProfile
);

router.get(
    "/all",
    protect,
    authorize("admin"),
    getAllMembers
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateMember
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteMember
);
module.exports = router;