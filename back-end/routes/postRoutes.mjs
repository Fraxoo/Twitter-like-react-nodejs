import express from "express";
import { Post } from "../models/index.mjs";

const router = express.Router();

// ✅ GET all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).json({ error: "Post not found" });

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ POST create post
router.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ PUT update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).json({ error: "Post not found" });

        await post.update(req.body);
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ DELETE post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).json({ error: "Post not found" });

        await post.destroy();
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
