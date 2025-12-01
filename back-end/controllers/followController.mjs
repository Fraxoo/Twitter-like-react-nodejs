import { Follow } from "../models/index.mjs";



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


export async function isFollowed(req,res) {
    try{

        const user_id = req.user.id;
        const profileUserId = req.params.id;

        const isFollowed = await Follow.findOne({
            where: {
                user_id: user_id,
                followed_id: profileUserId
            }
        });

        return res.status(200).json(!!isFollowed)
    } catch(err){
        return catchError(res,err)
    }
}


export async function getAllFollowingByUser(req, res) {
    try {
        const offset = Number(req.params.offset) || 0;
        const profileUserId = Number(req.params.id);

        const data = await Follow.findAll({
            where: { user_id: profileUserId }, 
            include: [
                {
                    model: User,
                    as: "followed", 
                    attributes: ["id", "name", "lastname", "username", "avatar_url"]
                }
            ],
            offset,
            limit: 10,
            order: [["createdAt", "DESC"]],
        });

        // retourne les users suivis
        const following = data.map(follow => follow.followed);

        return res.status(200).json({ following });

    } catch (err) {
        return catchError(res, err);
    }
}


export async function getAllFollowersByUser(req, res) {
    try {
        const offset = Number(req.params.offset) || 0;
        const profileUserId = Number(req.params.id);

        const data = await Follow.findAll({
            where: { followed_id: profileUserId },
            include: [
                {
                    model: User,
                    as: "follower",
                    attributes: ["id", "name", "lastname", "username", "avatar_url"]
                }
            ],
            offset,
            limit: 10,
            order: [["createdAt", "DESC"]],
        });

        const followers = data.map(follow => follow.follower);

        return res.status(200).json({ followers });

    } catch (err) {
        return catchError(res, err);
    }
}


export async function addFollow(req, res) {
    try {
        const user_id = Number(req.user.id);
        const followed_id = Number(req.params.id);

        if (!user_id || !followed_id) {
            return sendErrors(res, [{ field: "global", message: "Erreur veuillez réessayer" }], 400);
        }

        if(user_id === followed_id){
            return sendErrors(res,[{field: "global",message: "Impossible de se suivre sois meme"}])
        }

        const followed = await Follow.findOne({ where: { user_id, followed_id } })

        if (followed) {
            return res.status(200).json({ followed: true })
        }

        const newFollow = await Follow.create({ user_id, followed_id })

        return res.status(201).json({ followed: true, follow: newFollow })
    } catch (err) {
        return catchError(res, err)
    }
}

export async function removeFollow(req, res) {
    try {
        const user_id = Number(req.user.id);
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
