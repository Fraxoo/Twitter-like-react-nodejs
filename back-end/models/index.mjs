import { User } from "./UserModel.mjs";
import { Post } from "./PostModel.mjs";
import { Like } from "./LikeModel.mjs";
import { Follow } from "./Follow.mjs";



User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

User.hasMany(Follow, {
    as: "following",
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Follow.belongsTo(User, {
    as: "follower",
    foreignKey: "user_id"
});

User.hasMany(Follow, {
    as: "followers",
    foreignKey: "followed_id",
    onDelete: "CASCADE"
});

Follow.belongsTo(User, {
    as: "followed",
    foreignKey: "followed_id"
});

User.hasMany(Like, { foreignKey: "user_id", onDelete: "CASCADE" });
Post.hasMany(Like, { foreignKey: "post_id", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "user_id" });
Like.belongsTo(Post, { foreignKey: "post_id" });



Post.belongsTo(User, {
    foreignKey: "user_id"
})

Post.belongsTo(Post, {
    as: "parent",
    foreignKey: "parent_id",
    constraints: false
});

Post.hasMany(Post, {
    as: "replies",
    foreignKey: "parent_id",
    constraints: false //Securité a verifier 
});






export { User, Post, Follow }