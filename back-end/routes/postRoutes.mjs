import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

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
routeur.post("/create", isLoggedInJWT(), createPost);
routeur.post("/create/:postid", isLoggedInJWT(),createCommentPost)
routeur.put("/update/:id", isLoggedInJWT(), updatePost);
routeur.delete("/delete/:id", isLoggedInJWT(), deletePost);


export default routeur