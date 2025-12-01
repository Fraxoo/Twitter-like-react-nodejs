import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"
import { uploadManyMedias } from "../middleware/Uploads.mjs";

import {
    getPostWithReplies,
    createPost,
    createCommentPost,
    updatePost,
    deletePost,
    getAllPostWithLimit
} from "../controllers/postController.mjs";

const routeur = express.Router();

routeur.get("/get/all/:offset", isLoggedInJWT(),getAllPostWithLimit)
routeur.get("/get/:id/:offset", isLoggedInJWT(),getPostWithReplies);


//secure path
routeur.post("/create", isLoggedInJWT(),uploadManyMedias, createPost);
routeur.post("/create/:postid", isLoggedInJWT(),uploadManyMedias,createCommentPost)
routeur.put("/update/:id", isLoggedInJWT(),uploadManyMedias, updatePost);
routeur.delete("/delete/:id", isLoggedInJWT(), deletePost);


export default routeur