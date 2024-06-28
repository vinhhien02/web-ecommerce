const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, favoriteController.createFavorite);
router.get("/getall", verifyToken, favoriteController.getFavorite);
router.delete("/delete/:_id", verifyToken, favoriteController.deleteFavorite);

// router.post("/sign-in", userController.handleLogin);

module.exports = router;
