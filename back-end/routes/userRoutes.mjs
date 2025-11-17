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
routeur.put("/update",isLoggedInJWT(),updateUser);
routeur.delete("/delete",isLoggedInJWT(),deleteUser);
routeur.get("/me", isLoggedInJWT(), (req, res) => {
    res.json(req.user);
});



export default routeur;