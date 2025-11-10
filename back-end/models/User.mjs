import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";

export const User = sequelize.define("User", {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 20], // min et max
        msg: "Username must be between 3 and 20 characters" // ✅ message ici
      }
    }
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Email invalide"
      }, // vérifie que c'est bien un email valide
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: "Le mot de passe doit etre entre 6 et 100 caracteres"
      }
    },
  },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },

    followers_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    following_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

  }, {
  tableName: "users",
  timestamps: false,
});


