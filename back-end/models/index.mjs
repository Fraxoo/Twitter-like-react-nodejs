import { sequelize } from "../config/database.mjs";

import { User } from "./User.mjs";
import { Post } from "./Post.mjs";
import { Follow } from "./Follow.mjs";
import { Like } from "./Like.mjs";
import { Comment } from "./Comment.mjs";
import { Hashtag } from "./Hashtag.mjs";
import { PostHashtag } from "./PostHashtag.mjs";

// =============================
// ✅ Déclaration des relations
// =============================

// User → Post
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

// Follow (User ↔ User)
User.belongsToMany(User, {
  through: Follow,
  as: "Followers",
  foreignKey: "followed_id",
  otherKey: "follower_id",
});

User.belongsToMany(User, {
  through: Follow,
  as: "Following",
  foreignKey: "follower_id",
  otherKey: "followed_id",
});

// Likes (User ↔ Post)
User.belongsToMany(Post, { through: Like, foreignKey: "user_id" });
Post.belongsToMany(User, { through: Like, foreignKey: "post_id" });

// Comments
Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// Hashtags (Post ↔ Hashtag)
Post.belongsToMany(Hashtag, {
  through: PostHashtag,
  foreignKey: "post_id",
});

Hashtag.belongsToMany(Post, {
  through: PostHashtag,
  foreignKey: "hashtag_id",
});

// =============================
// ✅ Export PRO
// =============================
export {
  sequelize,
  User,
  Post,
  Follow,
  Like,
  Comment,
  Hashtag,
  PostHashtag,
};
