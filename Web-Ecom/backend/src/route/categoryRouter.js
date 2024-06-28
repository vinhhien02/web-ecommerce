const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinaryConfig");

const categoryController = require("../controllers/categoryController");
const {
  verifyToken,
  isManager,
  isAdmin,
} = require("../middleware/authMiddleware");
router.post(
  "/create",
  [verifyToken, isManager],
  upload.single("image"),
  categoryController.createCategory
);
router.put(
  "/update/:_id",
  [verifyToken, isManager],
  categoryController.updateCategory
);
router.get(
  "/getdetail/:_id",
  [verifyToken, isManager],
  categoryController.getDetailCategory
);
router.delete(
  "/delete/:_id",
  [verifyToken, isAdmin],
  categoryController.deleteCategory
);
router.get("/get-all", categoryController.getAllCategory);

// router.post("/sign-in", userController.handleLogin);

module.exports = router;
