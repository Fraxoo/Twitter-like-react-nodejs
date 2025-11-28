import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Follow = sequelize.define("Follow",{
    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followed_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: "follow",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "followed_id"]
        }
    ]
})