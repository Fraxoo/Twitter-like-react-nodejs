import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/UserModel.mjs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.PRIVATE_JWT_KEY;

const sendErrors = (res, errors, status = 400) => {
    return res.status(status).json({ errors });
};

function catchError(res, err) {
    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return sendErrors(res, errors, 400);
    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
}




export async function getProfil(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Veuillez vous connecter."
            });
        }
        return res.json(req.user);
    } catch (err) {
        return catchError(res, err);
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        return catchError(res, err);
    }
}

export async function getUserByID(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return sendErrors(res, [{ field: "global", message: "Utilisateur introuvable." }], 404);
        }
        return res.json(user);
    } catch (err) {
        return catchError(res, err);
    }
}

export async function register(req, res) {
    try {
        const { name, lastname, username, email, password, confirmPassword } = req.body;

        if (!name || !lastname || !username || !email || !password || !confirmPassword) {
            return sendErrors(res, [{ field: "global", message: "Tous les champs sont obligatoires." }], 400);
        }

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return sendErrors(res, [{ field: "username", message: "Pseudo déjà utilisé." }], 409);
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return sendErrors(res, [{ field: "email", message: "E-mail déjà utilisé." }], 409);
        }

        if (password !== confirmPassword) {
            return sendErrors(res, [{ field: "password", message: "Les mots de passe ne correspondent pas." }], 400);
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            lastname,
            username,
            email,
            password: hashed
        });
        console.log(req.body);


        return res.status(201).json(newUser);
    } catch (err) {
        return catchError(res, err);
    }
}

export async function login(req, res) {
    try {


        const { email, password } = req.body;

        if (!email || !password) {
            return sendErrors(res, [{ field: "global", message: "Email et mot de passe requis." }], 400);
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return sendErrors(res, [{ field: "global", message: "Email ou mot de passe incorrect." }], 401);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return sendErrors(res, [{ field: "global", message: "Email ou mot de passe incorrect." }], 401);
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
             httpOnly: true,
             secure: false,
             sameSite: "lax"
             });
        res.json({ message: "Connexion réussie", });
    } catch (err) {
        return catchError(res, err)
    }
}

export async function updateUser(req, res) {
    try {
        const { id, name, lastname, username, email, password, } = req.body;

        if (!name || !lastname || !username || !email) {
            return sendErrors(res, [{ field: "global", message: "Tous les champs sont obligatoires." }], 400);
        }

        const user = await User.findByPk(id);

        if (!user) {
            return sendErrors(res, [{ field: "global", message: "Utilisateur Introuvable" }]);
        }

        if (username !== user.username) {
            const existingUsername = await User.findOne({ where: { username } });
            if (existingUsername) {
                return sendErrors(res, [{ field: "username", message: "Pseudo déjà utilisé." }], 409);
            }
        }

        if (email !== user.email) {
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return sendErrors(res, [{ field: "email", message: "E-mail déjà utilisé." }], 409);
            }
        }

        let updatedPassword = user.password;

        if (password && password.trim() !== "") {
            if (password.length < 6 || password.length > 100) {
                return sendErrors(res, [{ field: "password", message: "Le mot de passe doit contenir entre 6 et 100 caractères." }])
            }
            updatedPassword = await bcrypt.hash(password, 10);
        }


        const updateUser = await user.update(
            {
                name,
                lastname,
                username,
                email,
                password: updatedPassword
            },
            {
                where: { id }
            }
        )

        return res.status(201).json({ message: "Profil mis a jour avec succès." });

    } catch (err) {
        return catchError(res, err)
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return sendErrors(res, [{ field: "global", message: "Identifiant utilisateur manquant." }], 400);
        }

        const user = await User.findByPk(id);
        if (!user) {
            return sendErrors(res, [{ field: "global", message: "Utilisateur introuvable." }], 404);
        }

        await user.destroy();

        return res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (err) {
        return catchError(res, err);
    }
}

export async function logout(req,res) {
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.json({message: "Déconnecté"})
}