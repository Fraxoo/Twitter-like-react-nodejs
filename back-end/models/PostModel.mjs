import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Post = sequelize.define("Post", {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Contenu requis" },
            len: { args: [1, 280], msg: "1 a 280 caractéres." }
        }
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: "post",
    timestamps: true,
})