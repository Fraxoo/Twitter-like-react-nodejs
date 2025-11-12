// controllers/usersController.mjs
import bcrypt from "bcrypt";
import { User } from "../models/index.mjs";

const sendErrors = (res, errors, status = 400) => {
  // errors: array of { field, message }
  return res.status(status).json({ errors });
};

// GET all users
export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
  }
}

// GET user by ID
export async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return sendErrors(res, [{ field: "id", message: "User not found" }], 404);
    }
    return res.json(user);
  } catch (err) {
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
  }
}

// POST create user
export async function createUser(req, res) {
  try {
    const { name, lastname, username, email, password } = req.body;

    // Champs requis
    if (!name || !lastname || !username || !email || !password) {
      return sendErrors(
        res,
        [{ field: "global", message: "Tous les champs doivent être remplis" }],
        400
      );
    }
    
    // Doublon username
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return sendErrors(
        res,
        [{ field: "username", message: "Pseudo déjà utilisé" }],
        409
      );
    }

    // Doublon email
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return sendErrors(
        res,
        [{ field: "email", message: "Email déjà utilisé" }],
        409
      );
    }


    if (password.length < 6 || password.length > 100) {
      return sendErrors(
        res,
        [{ field: "password", message: "Le mot de passe doit etre entre 6 et 100 caracteres" }]
      )
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      username,
      email,
      password: hashed,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return sendErrors(res, errors, 400);
    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
  }
}

// PUT (full update)
export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return sendErrors(res, [{ field: "id", message: "User not found" }], 404);
    }

    const { email, username, password, ...rest } = req.body ?? {};

    // Vérifs de conflits (exclure l'utilisateur courant)
    if (email) {
      const conflictEmail = await User.findOne({
        where: { email },
      });
      if (conflictEmail && conflictEmail.id !== Number(id)) {
        return sendErrors(
          res,
          [{ field: "email", message: "Email déjà utilisé" }],
          409
        );
      }
    }

    if (username) {
      const conflictUsername = await User.findOne({
        where: { username },
      });
      if (conflictUsername && conflictUsername.id !== Number(id)) {
        return sendErrors(
          res,
          [{ field: "username", message: "Pseudo déjà utilisé" }],
          409
        );
      }
    }

    const payload = { ...rest };
    if (email) payload.email = email;
    if (username) payload.username = username;

    // Re-hash si on met à jour le mot de passe
    if (typeof password === "string" && password.length > 0) {
      payload.password = await bcrypt.hash(password, 10);
    }

    await user.update(payload);
    return res.json(user);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return sendErrors(res, errors, 400);
    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
  }
}

// PATCH (partial update)
export async function patchUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return sendErrors(res, [{ field: "id", message: "User not found" }], 404);
    }

    const { email, username, password, ...rest } = req.body ?? {};

    // Conflits
    if (email) {
      const conflictEmail = await User.findOne({ where: { email } });
      if (conflictEmail && conflictEmail.id !== Number(id)) {
        return sendErrors(
          res,
          [{ field: "email", message: "Email déjà utilisé" }],
          409
        );
      }
    }

    if (username) {
      const conflictUsername = await User.findOne({ where: { username } });
      if (conflictUsername && conflictUsername.id !== Number(id)) {
        return sendErrors(
          res,
          [{ field: "username", message: "Pseudo déjà utilisé" }],
          409
        );
      }
    }

    const payload = { ...rest };
    if (email) payload.email = email;
    if (username) payload.username = username;

    if (typeof password === "string" && password.length > 0) {
      payload.password = await bcrypt.hash(password, 10);
    }

    await user.update(payload);
    return res.json(user);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return sendErrors(res, errors, 400);
    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
  }
}

// DELETE user
export async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return sendErrors(res, [{ field: "id", message: "User not found" }], 404);
    }

    await user.destroy();
    return res.json({ message: "User deleted" });
    // Si tu préfères: return res.status(204).send();
  } catch (err) {
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
  }
}
