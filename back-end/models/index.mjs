import { User } from "./UserModel.mjs";
import { Post } from "./PostModel.mjs";

User.hasMany(Post,{
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Post.belongsTo(User,{
    foreignKey: "user_id"
})

export {User,Post}