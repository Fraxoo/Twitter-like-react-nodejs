import { Hashtag, Post, PostHashtag } from "../models/index.mjs";

// GET all hashtags
export async function getHashtags(req, res) {
  try {
    const hashtags = await Hashtag.findAll();
    res.json(hashtags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET hashtag by ID (avec les posts liés)
export async function getHashtagById(req, res) {
  try {
    const hashtag = await Hashtag.findByPk(req.params.id, { include: Post });
    if (!hashtag) return res.status(404).json({ error: "Hashtag not found" });
    res.json(hashtag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST create hashtag
export async function createHashtag(req, res) {
  try {
    const hashtag = await Hashtag.create(req.body);
    res.status(201).json(hashtag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT update hashtag (full)
export async function updateHashtag(req, res) {
  try {
    const hashtag = await Hashtag.findByPk(req.params.id);
    if (!hashtag) return res.status(404).json({ error: "Hashtag not found" });

    await hashtag.update(req.body);
    res.json(hashtag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH update hashtag (partial)
export async function patchHashtag(req, res) {
  try {
    const hashtag = await Hashtag.findByPk(req.params.id);
    if (!hashtag) return res.status(404).json({ error: "Hashtag not found" });

    await hashtag.update(req.body);
    res.json(hashtag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE hashtag
export async function deleteHashtag(req, res) {
  try {
    const hashtag = await Hashtag.findByPk(req.params.id);
    if (!hashtag) return res.status(404).json({ error: "Hashtag not found" });

    await hashtag.destroy();
    res.json({ message: "Hashtag deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST add hashtag to a post
export async function addHashtagToPost(req, res) {
  try {
    const { post_id, hashtag_id } = req.body;
    if (!post_id || !hashtag_id) {
      return res.status(400).json({ error: "post_id and hashtag_id are required" });
    }

    const link = await PostHashtag.findOne({ where: { post_id, hashtag_id } });
    if (link) return res.status(400).json({ error: "Already linked" });

    const postHashtag = await PostHashtag.create({ post_id, hashtag_id });
    res.status(201).json(postHashtag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE remove hashtag from post
export async function removeHashtagFromPost(req, res) {
  try {
    const { post_id, hashtag_id } = req.body;
    if (!post_id || !hashtag_id) {
      return res.status(400).json({ error: "post_id and hashtag_id are required" });
    }

    const link = await PostHashtag.findOne({ where: { post_id, hashtag_id } });
    if (!link) return res.status(404).json({ error: "Relation not found" });

    await link.destroy();
    res.json({ message: "Hashtag removed from post" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
