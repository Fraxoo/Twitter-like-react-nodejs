import express from "express"
import { User } from "../models/index.mjs";

import {
    getProfil,
    getUsers,
    getUserByID,
    register,
    login,
    updateUser,
    deleteUser,
    logout,
    getAllPostWithLimitByUser,
    getAllResponseByUser,
    getAllPostLikedByUser
} from "../controllers/userController.mjs";
import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";

const routeur = express.Router();

routeur.get("/", getUsers)
routeur.post("/register", register);
routeur.post("/login", login);
routeur.post("/logout", logout);


//SECURE PATH
routeur.get("/me", isLoggedInJWT(), getProfil);
routeur.get("/profil/:id/posts/:offset", isLoggedInJWT(), getAllPostWithLimitByUser)
routeur.get("/profil/:id/responses/:offset",isLoggedInJWT(),getAllResponseByUser)
routeur.get("/profil/:id/likes/:offset",isLoggedInJWT(),getAllPostLikedByUser)
routeur.put("/update", isLoggedInJWT(), updateUser);
routeur.delete("/delete", isLoggedInJWT(), deleteUser);

routeur.get("/:id", isLoggedInJWT(), getUserByID); ////// HYPER IMPORTANT MET LES ROUTES DYNAMIQUE EN BAS SINON CA CASSE TOUT


export default routeur;