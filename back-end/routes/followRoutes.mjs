import express from "express";
import { Follow } from "../models/index.mjs";

const router = express.Router();

// ✅ FOLLOW someone
router.post("/", async (req, res) => {
    try {
        // req.body must contain : follower_id, followed_id
        const follow = await Follow.create(req.body);
        res.json(follow);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ UNFOLLOW someone
router.delete("/", async (req, res) => {
    try {
        const { follower_id, followed_id } = req.body;

        const follow = await Follow.findOne({
            where: { follower_id, followed_id }
        });

        if (!follow) return res.status(404).json({ error: "Follow relation not found" });

        await follow.destroy();
        res.json({ message: "Unfollowed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
