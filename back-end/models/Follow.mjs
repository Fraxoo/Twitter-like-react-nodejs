import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Follow = sequelize.define("Follow", {
  follower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followed_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: "follows",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["follower_id", "followed_id"], // empêche un follow doublon
    },
  ],
});

