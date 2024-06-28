const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const {
  verifyToken,
  isManager,
  isAdmin,
} = require("../middleware/authMiddleware");

router.post("/create", verifyToken, reportController.createrReport);
router.get("/getall", verifyToken, reportController.getAllReport);
router.put("/update/:_id", verifyToken, reportController.updateReport);
// ************************
router.post(
  "/createinterested",
  verifyToken,
  reportController.createrInterested
);
router.get(
  "/getallinterested/:_id",
  verifyToken,
  reportController.getAllInterestedByUser
);
router.put(
  "/updateinterested/:_id",
  verifyToken,
  reportController.updateInterested
);

module.exports = router;
