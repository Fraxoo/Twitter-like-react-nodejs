import { Follow } from "../models/Follow.mjs";
import { User } from "../models/UserModel.mjs";


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



export async function getAllFollowByUser(req, res) {
    try {

        const offset = Number(req.params.offset) || 0;
        const profileUserId = Number(req.params.id);
        const currentUserId = Number(req.user?.id);

        const FollowerData = await User.findAll({
            include: [
                {
                    model: Follow,
                    where: { user_id: profileUserId },
                    attributes: []
                },
                { model: User }
            ],
            offset,
            limit: 10,
            order: [["updatedAt", "DESC"]],
        })

        const followers = FollowerData.map(follower => ({
            id: follower.id,
            name: follower.name,
            lastname: follower.lastname,
            username: follower.username
        }));

        return res.status(200).json({
            followers
        })

    } catch (err) {
        return catchError(res, err);
    }
}


export async function addFollow(req, res) {
    try {
        const user_id = req.user.id;
        const followed_id = req.params.id;

        if (!user_id || !follow_id) {
            return sendErrors(res, [{ field: "global", message: "Erreur veuillez réessayer" }], 400);
        }

        const followed = await Follow.findOne({ where: { user_id, followed_id } })

        if (followed) {
            return res.status(200).json({ followed: true })
        }

        const newFollow = await Follow.create({ user_id, followed_id })

        return res.status(201).json({ followed: true, follow: newFollow })
    } catch (err) {
        return catchError(req, err)
    }
}

export async function removeFollow(req, res) {
    try {
        const user_id = req.user.id;
        const followed_id = Number(req.params.id);

        if (!user_id || !followed_id) {
            return sendErrors(res, [
                { field: "global", message: "Erreur veuillez réessayer" }
            ], 400);
        }

        const removed = await Follow.destroy({
            where: { user_id, followed_id }
        });

        if (removed === 0) {
            return sendErrors(res, [
                { field: "follow", message: "Vous ne suivez pas cet utilisateur" }
            ], 400);
        }

        return res.status(200).json({ followed: false });

    } catch (err) {
        return catchError(res, err)
    }
}
