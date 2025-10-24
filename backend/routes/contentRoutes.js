const express = require("express");
const {
  generateContent,
  getAllDrafts,
  getContentByDraftId,
} = require("../controllers/CraeteContentController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", verifyToken, generateContent);
router.get("/", verifyToken, getAllDrafts);
router.get("/:draftId", verifyToken, getContentByDraftId);

module.exports = router;
