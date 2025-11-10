import { Like } from "../models/index.mjs";

// POST /likes → créer un like
export async function createLike(req, res) {
  try {
    const { user_id, post_id } = req.body;

    if (!user_id || !post_id) {
      return res.status(400).json({ error: "user_id and post_id are required" });
    }

    // Vérifie si le like existe déjà
    const existingLike = await Like.findOne({ where: { user_id, post_id } });
    if (existingLike) {
      return res.status(400).json({ error: "Already liked" });
    }

    const like = await Like.create({ user_id, post_id });
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /likes → supprimer un like
export async function deleteLike(req, res) {
  try {
    const { user_id, post_id } = req.body;

    if (!user_id || !post_id) {
      return res.status(400).json({ error: "user_id and post_id are required" });
    }

    const like = await Like.findOne({ where: { user_id, post_id } });
    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    await like.destroy();
    res.json({ message: "Like removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
