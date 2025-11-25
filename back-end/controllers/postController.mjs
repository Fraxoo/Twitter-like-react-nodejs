import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Post } from "../models/PostModel.mjs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { User } from "../models/UserModel.mjs";
import { sequelize } from "../config/database.mjs";
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



export async function getPostWithReplies(req, res) {
    try {
        const id = Number(req.params.id);
        const offset = Number(req.params.offset) || 0;

        let postData = null;
        if (offset === 0) {
            postData = await Post.findByPk(id, {
                include: [{ model: User }],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(SELECT COUNT (*) FROM post AS reply WHERE reply.parent_id = Post.id)`),"comments_count" //comments count mais c'est post count techniquement
                        ]
                    ],

                },
            });

            if (!postData) {
                return sendErrors(res, [{ field: "global", message: "Post introuvable" }], 404);
            }
        }

        const repliesData = await Post.findAll({
            where: { parent_id: id },
            include: [{ model: User }],
            offset,
            limit: 10,
            order: [["createdAt", "ASC"]],
        });

        const replies = repliesData.map(reply => ({
            id: reply.id,
            content: reply.content,
            createdAt: reply.createdAt,
            updatedAt: reply.updatedAt,
            user: {
                id: reply.User.id,
                name: reply.User.name,
                lastname: reply.User.lastname,
                username: reply.User.username
            }
        }));

        return res.status(200).json({
            post:
                offset === 0
                    ? {
                        id: postData.id,
                        content: postData.content,
                        image_url: postData.image_url,
                        createdAt: postData.createdAt,
                        updatedAt: postData.updatedAt,
                        commentCount: postData.dataValues.comments_count,
                        user: {
                            id: postData.User.id,
                            name: postData.User.name,
                            lastname: postData.User.lastname,
                            username: postData.User.username
                        }
                    }
                    : null, // apres offset 0 on ne renvoie plus le post
            replies,
            hasMore: replies.length === 10
        });

    } catch (err) {
        return catchError(res, err);
    }
}


export async function getAllPost(req, res) {
    try {
        const postsData = await Post.findAll({
            include: [{ model: User }],
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
              SELECT COUNT(*)
              FROM post AS reply
              WHERE reply.parent_id = Post.id
            )`),
                        "comments_count"
                    ]
                ],

            },
            order: [["updatedAt", "DESC"]],
        });
        if (!postsData || postsData.length === 0) {
            return sendErrors(res, [{ field: "global", msg: "Aucun post pour le moment" }], 404); //pas faire ca voir function d'en dessous 
        }

        console.log(postsData);


        const posts = postsData.map(post => ({
            id: post.id,
            content: post.content,
            image_url: post.image_url,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            commentCount: post.dataValues.comments_count,
            user: {
                id: post.User.id,
                name: post.User.name,
                lastname: post.User.lastname,
                username: post.User.username
            },

        }));
        console.log(posts)
        return res.status(200).json(posts); //met 200 sur les get
    } catch (err) {
        return catchError(res, err)
    }
}



export async function getAllPostWithLimit(req, res) {
    try {
        const offset = Number(req.params.offset);

        const postsData = await Post.findAll({
            where: { parent_id: null },
            include: [{ model: User }],
            offset: offset, limit: 10,
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
              SELECT COUNT(*)
              FROM post AS reply
              WHERE reply.parent_id = Post.id
            )`),
                        "comments_count"
                    ]
                ],

            },
            order: [["updatedAt", "DESC"]],
        });
        if (!postsData || postsData.length === 0) {
            return res.status(200).json([]); // <-- Indique juste "plus de posts" sinon ca casse le infinite scroll
        }

        const posts = postsData.map(post => ({
            id: post.id,
            content: post.content,
            image_url: post.image_url,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            commentCount: post.dataValues.comments_count,
            user: {
                id: post.User.id,
                name: post.User.name,
                lastname: post.User.lastname,
                username: post.User.username
            },

        }));
        return res.status(200).json(posts);
    } catch (err) {
        return catchError(res, err)
    }
}

// export async function getPostByID(req, res) {
//     try {
//         const id = req.params.id;
//         const post = await Post.findByPk(id, {
//             include: [{ model: User }],
//             attributes: {

//             },
//         });

//         if (!post) {
//             return sendErrors(res, [{ field: "global", message: "Post introuvable" }], 404);
//         }

//         const finalPost = {
//             id: post.id,
//             content: post.content,
//             image_url: post.image_url,
//             createdAt: post.createdAt,
//             updatedAt: post.updatedAt,
//             commentCount: post.dataValues.comments_count,
//             user: {
//                 id: post.User.id,
//                 name: post.User.name,
//                 lastname: post.User.lastname,
//                 username: post.User.username
//             }
//         }


//         return res.status(201).json(finalPost);
//     } catch (err) {
//         return catchError(res, err)
//     }
// }

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
            parent_id: null,
            user_id: req.user.id
        });

        return res.status(201).json(newPost)
    } catch (err) {
        return catchError(res, err);
    }
}
export async function createCommentPost(req, res) {
    try {
        // const { content, image_url } = req.body;
        const postId = req.params.postid;
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        const newPost = await Post.create({
            content: content.trim(),
            image_url: null,
            parent_id: postId,
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
