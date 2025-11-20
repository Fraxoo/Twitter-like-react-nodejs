import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

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
routeur.post("/create",isLoggedInJWT(), createPost);
routeur.put("/update/:id", isLoggedInJWT(),updatePost);
routeur.delete("/delete/:id",isLoggedInJWT(),deletePost);


export default routeur