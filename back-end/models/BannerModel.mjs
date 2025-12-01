import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Banner = sequelize.define("Banner", {
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("image"),
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "banner",
    timestamps: true
})