import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Like = sequelize.define("Like", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "likes",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "post_id"]   // pour rendre unique le like en  lui meme 
        }
    ]
});
