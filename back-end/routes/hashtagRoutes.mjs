import express from "express";
import {
  getHashtags,
  getHashtagById,
  createHashtag,
  updateHashtag,
  patchHashtag,
  deleteHashtag,
  addHashtagToPost,
  removeHashtagFromPost
} from "../controllers/hashtagController.mjs";

const router = express.Router();

// CRUD de base
router.get("/", getHashtags);
router.get("/:id", getHashtagById);
router.post("/", createHashtag);
router.put("/:id", updateHashtag);
router.patch("/:id", patchHashtag);
router.delete("/:id", deleteHashtag);

// Relations avec les posts
router.post("/add", addHashtagToPost);
router.delete("/remove", removeHashtagFromPost);

export default router;
