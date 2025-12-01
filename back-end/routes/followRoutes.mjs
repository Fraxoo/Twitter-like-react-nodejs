import {
    getAllFollowersByUser, //Test
    getAllFollowingByUser,
    isFollowed,
    addFollow,
    removeFollow
} from "../controllers/followController.mjs"
import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";
import express from "express"

const routeur = express.Router();

routeur.get("/get/:id/isfollowed",isLoggedInJWT(),isFollowed)
routeur.get("/get/:id/following/:offset",isLoggedInJWT(),getAllFollowingByUser)
routeur.get("/get/:id/followers/:offset",isLoggedInJWT(),getAllFollowersByUser)
routeur.post("/add/:id",isLoggedInJWT(),addFollow)
routeur.post("/remove/:id",isLoggedInJWT(),removeFollow)


export default routeur;
