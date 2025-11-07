import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";



export const PostHashtag = sequelize.define("PostHashtag", {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hashtag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "post_hashtags",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["post_id", "hashtag_id"],
    },
  ],
});

