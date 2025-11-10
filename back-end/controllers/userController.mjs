import { User } from "../models/index.mjs";

// GET all users
export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET user by ID
export async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST create user
export async function createUser(req, res) {
  try {
    const { name, lastname, username, email, password } = req.body;

    if (!name, !lastname, !lastname, !username, !email, !password) {
      res.status(400).json({ error: "Tout les champs doivent etre remplis" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        error: { field: "email", message: "Email Déja utilisé" }
      });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      res.status(400).json({
        error: { field: "username", message: "Pseudo déja utilisé" }
      });
    }

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);

  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map(e => ({
        field: e.path,
        message: e.message
      }));
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: err.message });
  }
}

// PUT (full update)
export async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH (partial update)
export async function patchUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE user
export async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
