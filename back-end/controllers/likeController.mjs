import { Like } from "../models/index.mjs";

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


export async function addLikeToPost(req, res) {
    try {
        const post_id = req.params.postId;
        const user_id = req.user.id;

        if (!post_id || !user_id) {
            return sendErrors(res, [{ field: "global", message: "Erreur veuillez réessayer" }], 400);
        }

        const liked = await Like.findOne({ where: { user_id, post_id } });

        if (liked) {
            return res.status(200).json({ liked: true });
        }

        const newLike = await Like.create({ user_id, post_id });

        return res.status(201).json({ liked: true, like: newLike });

    } catch (err) {
        return catchError(res, err);
    }
}


export async function removeLikeFromPost(req, res) {
    try {
        const post_id = req.params.postId;
        const user_id = req.user.id;

        if (!user_id || !post_id) {
            return sendErrors(res, [
                { field: "like", message: "Erreur veuillez réessayer" }
            ], 400);
        }

        const removed = await Like.destroy({
            where: { user_id, post_id }
        });

        if (removed === 0) {
            return sendErrors(res, [
                { field: "like", message: "Post non liké, impossible d'annuler" }
            ], 400);
        }

        return res.status(200).json({ liked: false });

    } catch (err) {
        return catchError(res, err);
    }
}
