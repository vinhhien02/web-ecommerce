const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const {
  verifyToken,
  isManager,
  isAdmin,
} = require("../middleware/authMiddleware");

const upload = require("../config/cloudinaryConfig");
router.post(
  "/create",
  verifyToken,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.createProduct
);
router.get("/get-all", productController.getAllProduct);
//
router.put(
  "/update/:slug",
  verifyToken,
  upload.fields([
    { name: "images", maxCount: 10},
    { name: "thumb", maxCount: 1 },
  ]),
  productController.updateProduct
);
//
router.get("/get/user-product/:_id", productController.getAllProductUser);
router.get(
  "/get/current-product",
  verifyToken,
  productController.getAllProductCurrent
);
//
router.get("/get-detail/:slug", productController.getDetailsProduct);
router.get("/get-all/product/:slug", productController.getAllProductCategory);
router.get("/get-all/byadmin", productController.getAllByAdmin);

router.delete("/delete/:id", verifyToken, productController.deleteProduct);
router.put(
  "/updatestatus/:id",
  verifyToken,
  productController.updateProductStatus
);

// router.post("/sign-in", userController.handleLogin);

module.exports = router;
