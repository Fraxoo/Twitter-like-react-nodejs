import {
    getAllFollowersByUser, //Test
    getAllFollowingByUser,
    addFollow,
    removeFollow
} from "../controllers/followController.mjs"
import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

const routeur = express.Router();

routeur.get("/get/:id/following/:offset",isLoggedInJWT(),getAllFollowingByUser)
routeur.get("/get/:id/followers/:offset",isLoggedInJWT(),getAllFollowersByUser)
routeur.post("/post/add/:id",isLoggedInJWT(),addFollow)
routeur.post("/post/remove/:id",isLoggedInJWT(),removeFollow)


export default routeur;
