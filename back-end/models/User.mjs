import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";

export const User = sequelize.define("User", {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  followers_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  following_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

}, {
  tableName: "users",
  timestamps: false,
});


