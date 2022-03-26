const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/products").get(getProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, updateProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);
module.exports = router;
