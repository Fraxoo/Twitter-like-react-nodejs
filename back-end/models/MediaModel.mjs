import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Media = sequelize.define("Media", {
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("image", "video"),
        allowNull: false,
    },
    post_id: {
        type: DataTypes.NUMBER,
        allowNull: true,
    }
},{
    tableName: "media",
    timestamps: true,
})