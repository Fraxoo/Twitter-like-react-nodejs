import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"
import { User } from "../models/index.mjs";

import {
    getAllPost,
    getPostByID,
    createPost,
    updatePost,
    deletePost
} from "../controllers/postController.mjs";

const routeur = express.Router();

routeur.get("/get/", getAllPost);
routeur.get("/get/:id", getPostByID);


//secure path
routeur.post("/create",isLoggedInJWT(User), createPost);
routeur.put("/update/:id", isLoggedInJWT(User),updatePost);
routeur.delete("/delete/:id",isLoggedInJWT(User),deletePost);


export default routeur