import { Follow, User } from "../models/index.mjs";

// POST /follow → suivre un utilisateur
export async function createFollow(req, res) {
  try {
    const { follower_id, followed_id } = req.body;

    if (!follower_id || !followed_id) {
      return res.status(400).json({ error: "follower_id and followed_id are required" });
    }

    if (follower_id === followed_id) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    // Vérifie si la relation existe déjà
    const existingFollow = await Follow.findOne({ where: { follower_id, followed_id } });
    if (existingFollow) {
      return res.status(400).json({ error: "Already following this user" });
    }

    const follow = await Follow.create({ follower_id, followed_id });
    res.status(201).json(follow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /follow → arrêter de suivre un utilisateur
export async function deleteFollow(req, res) {
  try {
    const { follower_id, followed_id } = req.body;

    if (!follower_id || !followed_id) {
      return res.status(400).json({ error: "follower_id and followed_id are required" });
    }

    const follow = await Follow.findOne({ where: { follower_id, followed_id } });
    if (!follow) {
      return res.status(404).json({ error: "Follow relation not found" });
    }

    await follow.destroy();
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /follow/:userId/followers → liste des followers
export async function getFollowers(req, res) {
  try {
    const userId = req.params.userId;

    const followers = await Follow.findAll({
      where: { followed_id: userId },
      include: [{ model: User, as: "Follower", attributes: ["id", "username", "email"] }]
    });

    res.json(followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /follow/:userId/following → liste des comptes suivis
export async function getFollowing(req, res) {
  try {
    const userId = req.params.userId;

    const following = await Follow.findAll({
      where: { follower_id: userId },
      include: [{ model: User, as: "Followed", attributes: ["id", "username", "email"] }]
    });

    res.json(following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
