import { User } from "./UserModel.mjs";
import { Post } from "./PostModel.mjs";



User.hasMany(Post,{
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


Post.belongsTo(User,{
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






export {User,Post}