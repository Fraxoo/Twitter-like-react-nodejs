import express from "express";
import { Like } from "../models/index.mjs";

const router = express.Router();

// ✅ LIKE a post
router.post("/", async (req, res) => {
    try {
        // req.body doit contenir : user_id, post_id
        const like = await Like.create(req.body);
        res.json(like);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ UNLIKE a post
router.delete("/", async (req, res) => {
    try {
        const { user_id, post_id } = req.body;

        const like = await Like.findOne({
            where: { user_id, post_id }
        });

        if (!like) return res.status(404).json({ error: "Like not found" });

        await like.destroy();
        res.json({ message: "Like removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
