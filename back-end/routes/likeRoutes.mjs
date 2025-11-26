import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

import {
    addLikeToPost,
    removeLikeFromPost
} from "../controllers/likeController.mjs"

const routeur = express.Router();


routeur.post("/add/:postId", isLoggedInJWT(), addLikeToPost);
routeur.post("/remove/:postId", isLoggedInJWT(), removeLikeFromPost)

export default routeur;