import {
    getAllFollowByUser,
    addFollow,
    removeFollow
} from "../controllers/followController.mjs"
import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

const routeur = express.Router();

routeur.get("/get/:offset",isLoggedInJWT(),getAllFollowByUser)
routeur.post("/post/add/:id",isLoggedInJWT(),addFollow)
routeur.post("/post/remove/:id",isLoggedInJWT(),removeFollow)


export default routeur;
