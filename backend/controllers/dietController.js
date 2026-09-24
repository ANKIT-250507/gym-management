const Diet = require("../models/Diet");


// ===============================
// CREATE DIET
// ===============================
const createDiet = async (req, res) => {
  try {

    const diet = await Diet.create({
      ...req.body,
      trainer: req.user.id
    });

    const result = await Diet.findById(diet._id)
      .populate("member", "name email")
      .populate("trainer", "name email");

    res.status(201).json({
      message: "Diet created successfully",
      diet: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// GET ALL DIETS
// ===============================
const getDiets = async (req, res) => {
  try {

    const diets = await Diet.find()
      .populate("member", "name email")
      .populate("trainer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: diets.length,
      diets
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// GET MEMBER DIETS
// ===============================
const getMemberDiets = async (req, res) => {
  try {

    const diets = await Diet.find({
      member: req.params.memberId
    })
      .populate("member", "name email")
      .populate("trainer", "name email")
      .sort({ day: 1 });

    res.status(200).json({
      total: diets.length,
      diets
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// GET MY DIET
// ===============================
const getMyDiet = async (req, res) => {
  try {

    const diets = await Diet.find({
      member: req.user.id
    })
      .populate("trainer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: diets.length,
      diets
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// UPDATE DIET
// ===============================
const updateDiet = async (req, res) => {
  try {

    const diet = await Diet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("member", "name email")
      .populate("trainer", "name email");

    if (!diet) {
      return res.status(404).json({
        message: "Diet not found"
      });
    }

    res.status(200).json({
      message: "Diet updated successfully",
      diet
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// DELETE DIET
// ===============================
const deleteDiet = async (req, res) => {
  try {

    const diet = await Diet.findByIdAndDelete(req.params.id);

    if (!diet) {
      return res.status(404).json({
        message: "Diet not found"
      });
    }

    res.status(200).json({
      message: "Diet deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


module.exports = {
  createDiet,
  getDiets,
  getMemberDiets,
  getMyDiet,
  updateDiet,
  deleteDiet
};