import { Post } from "../models/index.mjs";

// GET all posts
export async function getPosts(req, res) {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET post by ID
export async function getPostById(req, res) {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST create new post
export async function createPost(req, res) {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT (full update)
export async function updatePost(req, res) {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.update(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH (partial update)
export async function patchPost(req, res) {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.update(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE post
export async function deletePost(req, res) {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
