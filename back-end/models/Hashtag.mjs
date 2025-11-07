import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Hashtag = sequelize.define("Hashtag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: "hashtags",
  timestamps: false,
});

