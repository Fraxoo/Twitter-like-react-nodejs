import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";

export const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Prénom requis." },
            len: { args: [2, 50], msg: "2 à 50 caractères." }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Nom requis." },
            len: { args: [2, 50], msg: "2 à 50 caractères." }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: { args: [4, 20], msg: "4 a 20 caractéres." }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "E-mail requis." },
            isEmail: { msg: "E-mail invalide." }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { args: [6, 100], msg: "6 à 50 caractères." }
        }
    },
    // Avatar du user
    avatar: {
        type: DataTypes.STRING,
        allowNull: true, // null = avatar par défaut
    },

    // Bannière du user
    banner: {
        type: DataTypes.STRING,
        allowNull: true,
    },


    role: { type: DataTypes.STRING, defaultValue: "user" },
    bio: { type: DataTypes.STRING, allowNull: true },
    followers_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    following_count: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: "users",
    timestamps: true
});

