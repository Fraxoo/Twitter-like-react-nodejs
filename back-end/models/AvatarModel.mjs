import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Avatar = sequelize.define("Avatar", {
    filname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("image"),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "avatar",
    timestamps: true
})