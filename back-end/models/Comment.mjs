import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";



export const Comment = sequelize.define("Comment", {

  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  tableName: "comments",
  timestamps: false,
});


