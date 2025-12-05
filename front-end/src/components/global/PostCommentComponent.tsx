import { Link } from "react-router";
import PostStatsComponents from "./PostStatsComponents";
import type { PostType } from "../../types/PostType";
import ImageDisplay from "./ImageDisplayComponent";


export default function PostCommentComponent({ post }: { post: PostType }) {

    return (
        <>
            <div className="post-card">
                <div className="post-card-content">
                    <div className="post-card-content-user">
                        <Link to={`/profil/${post.user.id}`} className="post-card-content-user-link" >
                            {post && <p className="hover-under">{post.user.name} {post.user.lastname}</p>}
                            {post && <p className="post-card-content-user-greyed">@{post.user.username}</p>}
                        </Link>
                    </div>
                    <div className="post-card-content-show">
                        <div>
                            <Link to={`/post/${post.id}`}>
                                {post && <p>{post.content}</p>}
                            </Link>
                        </div>
                        {post.medias && <ImageDisplay medias={post.medias}/>}
                    </div>
                </div>
                <div className="post-card-function">
                    <PostStatsComponents post={post} />
                </div>
            </div >
        </>
    )
}