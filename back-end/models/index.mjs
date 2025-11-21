import { User } from "./UserModel.mjs";
import { Post } from "./PostModel.mjs";
import { Comment } from "./CommentModel.mjs";



User.hasMany(Post,{
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

User.hasMany(Comment,{
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Post.belongsTo(User,{
    foreignKey: "user_id"
})

Post.hasMany(Comment,{
    foreignKey: "post_id",
    onDelete: "CASCADE"
})


Comment.belongsTo(User,{
    foreignKey: "user_id"
})
Comment.belongsTo(Post,{
    foreignKey: "post_id"
})


export {User,Post,Comment}