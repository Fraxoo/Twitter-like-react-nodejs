import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  patchPost,
  deletePost,
} from "../controllers/postController.mjs";

const router = express.Router();

// Routes REST pour les posts
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.patch("/:id", patchPost);
router.delete("/:id", deletePost);

export default router;
