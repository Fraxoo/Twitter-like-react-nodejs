import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";




export const Comment = sequelize.define("Comment",{
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Contenu requis"},
            len: {args: [1,280], msg: "1 a 280 caractéres"}
        }
    }
},{
    tableName: "comment",
    timestamps: true
})