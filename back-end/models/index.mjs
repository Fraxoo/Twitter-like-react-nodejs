import { User } from "./UserModel.mjs";
import { Post } from "./PostModel.mjs";
import { Like } from "./LikeModel.mjs";
import { Follow } from "./Follow.mjs";
import { Media } from "./MediaModel.mjs";
import { Banner } from "./BannerModel.mjs";
import { Avatar } from "./AvatarModel.mjs";

// ---------------------
// USER → POSTS
// ---------------------
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Post.belongsTo(User, {
    foreignKey: "user_id",
});


// ---------------------
// POSTS → MEDIA
// ---------------------
Post.hasMany(Media, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});
Media.belongsTo(Post, {
    foreignKey: "post_id",
});


// ---------------------
// FOLLOW SYSTEM
// ---------------------
User.hasMany(Follow, {
    as: "following",
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
User.hasMany(Follow, {
    as: "followers",
    foreignKey: "followed_id",
    onDelete: "CASCADE",
});

Follow.belongsTo(User, {
    as: "follower",
    foreignKey: "user_id",
});
Follow.belongsTo(User, {
    as: "followed",
    foreignKey: "followed_id",
});

// ---------------------
// LIKES SYSTEM
// ---------------------
User.hasMany(Like, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Post.hasMany(Like, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});
Like.belongsTo(User, {
    foreignKey: "user_id",
});
Like.belongsTo(Post, {
    foreignKey: "post_id",
});


// ---------------------
// REPLIES SYSTEM
// ---------------------
Post.belongsTo(Post, {
    as: "parent",
    foreignKey: "parent_id",
    constraints: false,
});

Post.hasMany(Post, {
    as: "replies",
    foreignKey: "parent_id",
    constraints: false,
});

// AVATAR / BANNER
User.hasOne(Avatar, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Avatar.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasOne(Banner, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Banner.belongsTo(User, {
    foreignKey: "user_id",
});


// Export complet
export { User, Post, Follow, Like, Media, Avatar, Banner };
