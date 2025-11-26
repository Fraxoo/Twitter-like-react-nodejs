import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

import {
    addLikeToPost,
    removeLikeFromPost
} from "../controllers/likeController.mjs"

const routeur = express.Router();


routeur.post("/add", isLoggedInJWT(), addLikeToPost);
routeur.post("/remove", isLoggedInJWT(), removeLikeFromPost)

export default routeur;