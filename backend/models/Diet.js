const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      required: true
    },

    foodItems: {
      type: String,
      required: true
    },

    calories: {
      type: Number,
      default: 0
    },

    protein: {
      type: Number,
      default: 0
    },

    carbs: {
      type: Number,
      default: 0
    },

    fats: {
      type: Number,
      default: 0
    },

    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      required: true
    },

    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diet", dietSchema);