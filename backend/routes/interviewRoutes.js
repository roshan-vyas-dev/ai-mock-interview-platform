const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/submit", protect, interviewController.submitInterview);
router.get("/my-interviews", protect, interviewController.getUserInterviews);
router.get("/admin/all", protect, adminOnly, interviewController.getAllInterviews);
router.get("/:id", protect, interviewController.getSingleInterview);

module.exports = router;