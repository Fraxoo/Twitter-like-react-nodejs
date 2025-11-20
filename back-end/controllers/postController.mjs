import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Post } from "../models/PostModel.mjs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { User } from "../models/UserModel.mjs";

dotenv.config();

const JWT_SECRET = process.env.PRIVATE_JWT_KEY;

const sendErrors = (res, errors, status = 400) => {
    return res.status(status).json({ errors });
};

function catchError(res, err) {
    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return sendErrors(res, errors, 400);
    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
}




export async function getAllPost(req, res) {
    try {
        const postsData = await Post.findAll({ include: User });
        if (!postsData || postsData.length === 0) {
            return sendErrors(res, [{ field: "global", msg: "Aucun post pour le moment" }], 404);
        }

        const posts = postsData.map(post => ({
            id: post.id,
            content: post.content,
            image_url: post.image_url,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user_id: post.user_id,
            user: {
                id: post.User.id,
                name: post.User.name,
                lastname: post.User.lastname,
                username: post.User.username
            }
        }));
        return res.status(201).json(posts);
    } catch (err) {
        return catchError(res, err)
    }
}

export async function getPostByID(req, res) {
    try {
        const { id } = req.body;
        const post = await Post.findByPk(id);

        if (!post) {
            return sendErrors(res, [{ field: "global", message: "Utilisateur introuvable" }], 404);
        }

        return res.status(201).json(post);
    } catch (err) {
        return catchError(res, err)
    }
}

export async function createPost(req, res) {
    try {
        // const { content, image_url } = req.body;
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        const newPost = await Post.create({
            content: content.trim(),
            image_url: null,
            user_id: req.user.id
        });

        return res.status(201).json(newPost)
    } catch (err) {
        return catchError(res, err);
    }
}

export async function updatePost(req, res) {
    try {
        const { id, content, image_url } = req.body;

        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        const post = await Post.findByPk(id);

        if (!post) {
            return sendErrors(res, [{ field: "global", message: "Post introuvable" }], 404);
        }

        await post.update(
            {
                content: content.trim(),
                image_url: image_url || null
            },
            {
                where: { id }
            })

        return res.status(200).json({ message: "Post mis a jour avec succès." })
    } catch (err) {
        return catchError(res, err)
    }
}

export async function deletePost(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return sendErrors(res, [{ field: "global", message: "Identifiant du post manquant." }], 400);
        }

        const post = await Post.findByPk(id);
        if (!post) {
            return sendErrors(res, [{ field: "global", message: "Post introuvable." }], 404);
        }

        await post.destroy();

        return res.status(200).json({ message: "Post supprimé avec succès." });
    } catch (err) {
        return catchError(res, err);
    }
}
