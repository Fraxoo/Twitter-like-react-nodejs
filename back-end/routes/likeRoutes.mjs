import express from "express";
import { createLike, deleteLike } from "../controllers/likeController.mjs";

const router = express.Router();

// Ajouter un like
router.post("/", createLike);

// Supprimer un like
router.delete("/", deleteLike);

export default router;
