import express from "express";
import {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowing
} from "../controllers/followController.mjs";

const router = express.Router();

// Créer une relation (follow)
router.post("/", createFollow);

// Supprimer une relation (unfollow)
router.delete("/", deleteFollow);

// Récupérer tous les followers d'un user
router.get("/:userId/followers", getFollowers);

// Récupérer tous les comptes suivis par un user
router.get("/:userId/following", getFollowing);

export default router;
