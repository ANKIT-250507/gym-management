const express = require("express");

const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    addReview,
    getReviews,
    searchProducts,
    getLowStockProducts
} = require("../controllers/productController");

router.post(
    "/create",
    protect,
    authorize("admin"),
    createProduct
);

router.get(
    "/",
    protect,
    getProducts
);

router.get(
    "/search",
    protect,
    searchProducts
);

router.get(
    "/low-stock",
    protect,
    authorize("admin"),
    getLowStockProducts
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateProduct
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteProduct
);

router.post(
    "/:id/review",
    protect,
    authorize("member"),
    addReview
);

router.get(
    "/:id/reviews",
    protect,
    getReviews
);

module.exports = router;