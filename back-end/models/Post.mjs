import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Post = sequelize.define("Post", {

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  tableName: "posts",
  timestamps: false,
});
