const express = require("express");

const router = express.Router();

const {
  createDiet,
  getDiets,
  getMemberDiets,
  getMyDiet,
  updateDiet,
  deleteDiet
} = require("../controllers/dietController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");


// Trainer/Admin → Create
router.post(
  "/",
  protect,
  authorize("admin", "trainer"),
  createDiet
);


// Admin/Trainer → All diets
router.get(
  "/",
  protect,
  authorize("admin", "trainer"),
  getDiets
);


// Member → Own diet
router.get(
  "/my",
  protect,
  authorize("member"),
  getMyDiet
);


// Admin/Trainer → Member diet
router.get(
  "/member/:memberId",
  protect,
  authorize("admin", "trainer"),
  getMemberDiets
);


// Admin/Trainer → Update
router.put(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  updateDiet
);


// Admin/Trainer → Delete
router.delete(
  "/:id",
  protect,
  authorize("admin", "trainer"),
  deleteDiet
);


module.exports = router;