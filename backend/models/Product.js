const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    comment: {
        type: String
    }

}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    reviews: [reviewSchema]

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);