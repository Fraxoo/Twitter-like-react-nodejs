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
    logout
} from "../controllers/userController.mjs";
import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";

const routeur = express.Router();

routeur.get("/", getUsers)
routeur.get("/me", isLoggedInJWT(), getProfil);
routeur.post("/register", register);
routeur.post("/login", login);
routeur.post("/logout",logout);


//SECURE PATH
routeur.put("/update", isLoggedInJWT(), updateUser);
routeur.delete("/delete", isLoggedInJWT(), deleteUser);

routeur.get("/:id", getUserByID); ////// HYPER IMPORTANT MET LES ROUTES DYNAMIQUE EN BAS SINON CA CASSE TOUT


export default routeur;