// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { Comment } from "../models/CommentModel.mjs";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { User } from "../models/UserModel.mjs";


// const sendErrors = (res, errors, status = 400) => {
//     return res.status(status).json({ errors });
// };

// function catchError(res, err) {
//     if (err.name === "SequelizeValidationError") {
//         const errors = err.errors.map((e) => ({
//             field: e.path,
//             message: e.message,
//         }));
//         return sendErrors(res, errors, 400);
//     }
//     return sendErrors(res, [{ field: "global", message: err.message }], 500);
// }


// export async function createCommentByID(req, res) {
//     try {
//         const post_id = req.params.id
//         const {content} = req.body;
//         if (!content || content.trim() === "") {
//             return sendErrors(res, [{ field: "content", msg: "Veuillez remplir ce champ" }],400);
//         }
//         const newComment = await Comment.create({
//             content: content.trim(),
//             post_id: post_id,
//             user_id: req.user.id
//         })

//         return res.status(201).json(newComment);
//     } catch (err) {
//         return catchError(res, err);
//     }
// }




// export async function getAllCommentByIdOffset(req,res) {
//     try{
//         const id = req.params.id;
//         const offset = req.params.offset;
//         const commentData = await Comment.findAll(
//             {
//                 where: {post_id: id} 
//             })
//     } catch (err) {
//         return catchError(res,err)
//     }
// }












