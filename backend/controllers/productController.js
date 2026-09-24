const Product = require("../models/Product");


// Admin Add Product
const createProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get All Products
const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json({
            total: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const searchProducts = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const products = await Product.find({

            name: {
                $regex: keyword,
                $options: "i"
            }

        });

        res.status(200).json({

            total: products.length,

            products

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getLowStockProducts = async (req, res) => {

    try {

        const products = await Product.find({

            stock: {
                $lte: 5
            }

        });

        res.status(200).json({

            total: products.length,

            products

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Admin Update Product
const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json({
            message: "Product Updated Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Admin Delete Product
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Member Add Review
const addReview = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        product.reviews.push({

            member: req.user.id,

            rating: req.body.rating,

            comment: req.body.comment

        });

        await product.save();

        res.status(200).json({
            message: "Review Added Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get Product Reviews
const getReviews = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("reviews.member", "name");

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json({
            totalReviews: product.reviews.length,
            reviews: product.reviews
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    addReview,
    getReviews,
    searchProducts,
    getLowStockProducts
};