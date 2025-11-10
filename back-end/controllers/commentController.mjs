import { Comment, User, Post } from "../models/index.mjs";

// GET all comments
export async function getComments(req, res) {
  try {
    const comments = await Comment.findAll({ include: [User, Post] });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET comments by post ID
export async function getCommentsByPostId(req, res) {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({
      where: { post_id: postId },
      include: [User]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET comment by ID
export async function getCommentById(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.id, { include: [User, Post] });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST create comment
export async function createComment(req, res) {
  try {
    const { content, user_id, post_id } = req.body;

    if (!content || !user_id || !post_id) {
      return res.status(400).json({ error: "content, user_id and post_id are required" });
    }

    const comment = await Comment.create({ content, user_id, post_id });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT update (full)
export async function updateComment(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    await comment.update(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH update (partial)
export async function patchComment(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    await comment.update(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE comment
export async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
