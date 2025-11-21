import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

import {
    createCommentByID
} from "../controllers/commentsController.mjs"

const routeur = express.Router();

routeur.post("/create/:id",isLoggedInJWT(), createCommentByID)


export default routeur;