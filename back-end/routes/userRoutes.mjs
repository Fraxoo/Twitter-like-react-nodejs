import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/userController.mjs";

const router = express.Router();

// Routes REST
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", createUser);
router.post("/login",login)
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;
