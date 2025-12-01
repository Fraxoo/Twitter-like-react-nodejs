import dotenv from "dotenv";
import { User, Post } from "../models/index.mjs";
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
        console.log(req.user);

        const id = Number(req.params.id);
        const offset = Number(req.params.offset) || 0;
        const user_id = Number(req.user.id);
        let postData = null;

        if (offset === 0) {
            postData = await Post.findByPk(id, {
                include: [{ model: User }],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`
                                (SELECT COUNT(*) FROM post AS reply WHERE reply.parent_id = Post.id)
                            `),
                            "comments_count"
                        ],

                        [
                            sequelize.literal(`
                                (SELECT COUNT(*) FROM likes AS l WHERE l.post_id = Post.id)
                            `),
                            "likes_count"
                        ],

                        [
                            sequelize.literal(`
                                (SELECT COUNT(*) FROM likes AS l
                                WHERE l.post_id = Post.id AND l.user_id = ${user_id})    
                            `),
                            "isLiked"   ///laisser user_id || 0 le temps de faire la verification de connexion 
                        ]
                    ]
                }
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
            order: [["createdAt", "DESC"]],
            attributes: {
                include: [
                    [
                        sequelize.literal(`
                            (SELECT COUNT(*) FROM post AS reply WHERE reply.parent_id = Post.id)
                        `),
                        "comments_count"
                    ],
                    [
                        sequelize.literal(`
                            (SELECT COUNT(*) FROM likes AS l WHERE l.post_id = Post.id)
                        `),
                        "likes_count"
                    ],
                    [
                        sequelize.literal(`
                            (SELECT COUNT(*) FROM likes AS l
                            WHERE l.post_id = Post.id AND l.user_id = ${user_id})
                        `),
                        "isLiked"
                    ]
                ]
            }
        });

        const replies = repliesData.map(reply => ({
            id: reply.id,
            content: reply.content,
            commentCount: reply.dataValues.comments_count,
            likesCount: reply.dataValues.likes_count,
            isLiked: !!reply.dataValues.isLiked, //!! renvoie un boolean
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
                        likesCount: postData.dataValues.likes_count,
                        isLiked: !!postData.dataValues.isLiked,
                        user: {
                            id: postData.User.id,
                            name: postData.User.name,
                            lastname: postData.User.lastname,
                            username: postData.User.username
                        }
                    }
                    : null,
            replies,
            hasMore: replies.length === 10
        });

    } catch (err) {
        return catchError(res, err);
    }
}

export async function getAllPostWithLimit(req, res) {
    try {
        const offset = Number(req.params.offset);
        const user_id = req.user?.id;

        const postsData = await Post.findAll({
            where: { parent_id: null },
            include: [{ model: User }],
            offset,
            limit: 10,
            order: [["updatedAt", "DESC"]],
            attributes: {
                include: [
                    [
                        sequelize.literal(`
                            (SELECT COUNT(*) FROM post AS reply WHERE reply.parent_id = Post.id)
                        `),
                        "comments_count"
                    ],
                    [
                        sequelize.literal(`
                            (SELECT COUNT(*) FROM likes AS l WHERE l.post_id = Post.id)
                        `),
                        "likes_count"
                    ],
                    [
                        sequelize.literal(`
                            (SELECT COUNT(*) FROM likes AS l
                             WHERE l.post_id = Post.id AND l.user_id = ${user_id})
                        `),
                        "isLiked"
                    ]
                ]
            }
        });

        if (!postsData || postsData.length === 0) {
            return res.status(200).json([]);
        }

        const posts = postsData.map(postData => ({
            id: postData.id,
            content: postData.content,
            image_url: postData.image_url,
            createdAt: postData.createdAt,
            updatedAt: postData.updatedAt,
            commentCount: postData.dataValues.comments_count,
            likesCount: postData.dataValues.likes_count,
            isLiked: !!postData.dataValues.isLiked,
            user: {
                id: postData.User.id,
                name: postData.User.name,
                lastname: postData.User.lastname,
                username: postData.User.username
            }
        }));

        return res.status(200).json(posts);

    } catch (err) {
        return catchError(res, err);
    }
}




export async function createPost(req, res) {
    try {
        const { content } = req.body;

        // Vérification du texte
        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        // 1️⃣ Création du post
        const newPost = await Post.create({
            content: content.trim(),
            parent_id: null,
            user_id: req.user.id
        });

        // 2️⃣ Gestion des médias (0, 1 ou plusieurs)
        if (req.files && req.files.length > 0) {
            await Promise.all(
                req.files.map((file) => {

                    const isImage = file.mimetype.startsWith("image/");
                    const isVideo = file.mimetype.startsWith("video/");

                    return Media.create({
                        post_id: newPost.id,  // 🔥 ID déjà créé !
                        filename: file.filename,
                        type: isImage ? "image" : isVideo ? "video" : "unknown",
                    });
                })
            );
        }

        // 3️⃣ Retour du post
        return res.status(201).json({
            message: "Post créé avec succès",
            post: newPost
        });

    } catch (err) {
        console.error(err);
        return catchError(res, err);
    }
}

export async function createCommentPost(req, res) {
    try {
        const postId = req.params.postid;
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        const newPost = await Post.create({
            content: content.trim(),
            parent_id: postId,
            user_id: req.user.id
        });

        if (req.files && req.files.length > 0) {
            await Promise.all(
                req.files.map((file) => {
                    const isImage = file.mimetype.startsWith("image/");
                    const isVideo = file.mimetype.startsWith("video/");

                    return Media.create({
                        post_id: newPost.id,
                        filename: file.filename,
                        type: isImage ? "image" : isVideo ? "video" : "unknown",
                    });
                })
            );
        }

        return res.status(201).json(newPost);
    } catch (err) {
        return catchError(res, err);
    }
}


export async function updatePost(req, res) {
    try {
        const { content } = req.body;
        const id = req.params.id;

        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        const post = await Post.findByPk(id);

        if (!post) {
            return sendErrors(res, [{ field: "global", message: "Post introuvable" }], 404);
        }

        await post.update({ content: content.trim() });

        if (req.files && req.files.length > 0) {
            await Media.destroy({ where: { post_id: id } });

            await Promise.all(
                req.files.map((file) => {
                    const isImage = file.mimetype.startsWith("image/");
                    const isVideo = file.mimetype.startsWith("video/");

                    return Media.create({
                        post_id: id,
                        filename: file.filename,
                        type: isImage ? "image" : isVideo ? "video" : "unknown",
                    });
                })
            );
        }

        return res.status(200).json({ message: "Post mis à jour avec succès." });
    } catch (err) {
        return catchError(res, err);
    }
}


export async function deletePost(req, res) {
    try {
        const id = req.params.id;

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

