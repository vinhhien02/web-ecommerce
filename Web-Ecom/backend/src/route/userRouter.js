const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const upload = require("../config/cloudinaryConfig");
const {
  verifyToken,
  isManager,
  isAdmin,
} = require("../middleware/authMiddleware");
router.post("/sign-up", userController.createUser);
router.get("/finalregister/:token", userController.finalRegister);

router.post("/sign-in", userController.handleLogin);
router.delete("/log-out", verifyToken, userController.logoutUser);
router.post("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetPassword);
router.put(
  "/upload-avatar",
  verifyToken,
  upload.single("imageUser"),
  userController.uploadAvatar
);
router.put(
  "/update/:id",
  [verifyToken, isAdmin],
  userController.updateUserByAdmin
);
router.put("/update", verifyToken, userController.updateUser);
router.delete("/delete/:id", [verifyToken, isAdmin], userController.deleteUser);
router.get("/getuser", [verifyToken, isManager], userController.getAllUser);
router.get("/get-detail", verifyToken, userController.getDetailsUser);
router.get("/get-detail/:_id", userController.getDetailsUserById);
router.post("/refresh_token", userController.refreshToken);
module.exports = router;
