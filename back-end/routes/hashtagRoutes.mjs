import express from "express";
import { Hashtag, Post, PostHashtag } from "../models/index.mjs";

const router = express.Router();

// ✅ GET all hashtags
router.get("/", async (req, res) => {
    try {
        const hashtags = await Hashtag.findAll();
        res.json(hashtags);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET all posts for a specific hashtag
router.get("/:id/posts", async (req, res) => {
    try {
        const hashtag = await Hashtag.findByPk(req.params.id, {
            include: Post
        });

        if (!hashtag)
            return res.status(404).json({ error: "Hashtag not found" });

        res.json(hashtag.Posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ POST create hashtag
router.post("/", async (req, res) => {
    try {
        const hashtag = await Hashtag.create(req.body);
        res.json(hashtag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ POST add hashtag to a post
router.post("/add", async (req, res) => {
    try {
        // req.body = { post_id, hashtag_id }
        const link = await PostHashtag.create(req.body);
        res.json(link);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ DELETE remove hashtag from a post
router.delete("/remove", async (req, res) => {
    try {
        const { post_id, hashtag_id } = req.body;

        const link = await PostHashtag.findOne({
            where: { post_id, hashtag_id }
        });

        if (!link)
            return res.status(404).json({ error: "PostHashtag relation not found" });

        await link.destroy();

        res.json({ message: "Hashtag removed from post" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ DELETE delete a full hashtag
router.delete("/:id", async (req, res) => {
    try {
        const hashtag = await Hashtag.findByPk(req.params.id);

        if (!hashtag)
            return res.status(404).json({ error: "Hashtag not found" });

        await hashtag.destroy();

        res.json({ message: "Hashtag deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
