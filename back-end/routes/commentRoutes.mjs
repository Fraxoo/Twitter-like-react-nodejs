import express from "express";
import { Comment } from "../models/index.mjs";

const router = express.Router();

// ✅ GET all comments for a specific post
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { post_id: req.params.postId }
        });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ POST create comment
router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:id",async (req,res) => {
    try{
        const comment = await Comment.findByPk(req.params.id);
        if(!comment) return res.status(404).json({error : "Comment not found"});
        await comment.update(req.body);
        res.json(comment);
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ✅ DELETE comment
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment) return res.status(404).json({ error: "Comment not found" });

        await comment.destroy();
        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
