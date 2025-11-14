import express from "express"
import { User } from "../models/index.mjs";

import {
    getUsers,
    getUserByID,
    register,
    login,
    updateUser,
    deleteUser
} from "../controllers/userController.mjs";
import { isLoggedInJWT } from "../middleware/IsLoggedInJWT.mjs";

const routeur = express.Router();

routeur.get("/",getUsers)
routeur.get("/:id",getUserByID);
routeur.post("/register",register);
routeur.post("/login",login);


//SECURE PATH
routeur.put("/update",isLoggedInJWT(User),updateUser);
routeur.delete("/delete",isLoggedInJWT(User,deleteUser));


export default routeur;