import { Link } from "react-router";

type PostType = {
    id: number;
    content: string;
    image_url?: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        lastname: string;
        username: string;
    };
};


export default function PostComponent({ post }: { post: PostType }) {


    console.log(post);


    return (
        <div className="post-card">
            <div className="post-card-content">
                    <Link className="post-card-content-user" to={`profil/${post.user.id}`} >
                        {post && <p>{post.user.name} {post.user.lastname}</p>}
                        {post && <p className="post-card-content-user-greyed">@{post.user.username}</p>}
                    </Link>
                {post && <p>{post.content}</p>}
            </div>
        </div >
    )
}