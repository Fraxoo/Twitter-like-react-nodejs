import express from "express";
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  patchComment,
  deleteComment,
  getCommentsByPostId
} from "../controllers/commentController.mjs";

const router = express.Router();

// Récupérer tous les commentaires
router.get("/", getComments);

// Récupérer les commentaires d’un post spécifique
router.get("/post/:postId", getCommentsByPostId);

// Récupérer un commentaire par son ID
router.get("/:id", getCommentById);

// Créer un commentaire
router.post("/", createComment);

// Modifier complètement un commentaire
router.put("/:id", updateComment);

// Modifier partiellement un commentaire
router.patch("/:id", patchComment);

// Supprimer un commentaire
router.delete("/:id", deleteComment);

export default router;
