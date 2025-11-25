import { useState } from "react";
import { Link } from "react-router";
import CommentModal from "../../ui/modal/CommentModal";

type PostType = {
    id: number;
    content: string;
    image_url?: string | null;
    createdAt: string;
    commentCount: number;
    user: {
        id: number;
        name: string;
        lastname: string;
        username: string;
    };
};


export default function PostCommentComponent({ post }: { post: PostType }) {

    const [showCommentModal, setShowCommentModal] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    console.log(post);
    


    async function handleCreateComment(data: { content: string }) {
        try {
            const res = await fetch(`http://localhost:8000/post/create/${post.id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (!res.ok) {
                console.error(result);
                return;
            }

            console.log("Commentaire créé :", result);

        } catch (error) {
            console.error("Erreur serveur:", error);
            setErrors({ global: "Erreur veuillez réesayer" })
        }
    }
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
                    <Link  to={`/post/${post.id}`}>
                        {post && <p>{post.content}</p>}
                    </Link>
                </div>
                <div className="post-card-function">
                    <div className="post-card-function-comment" onClick={() => setShowCommentModal(true)}>
                        <button title="comment" ><i className="fa-regular fa-comment"></i></button>
                        {post && <p>{post.commentCount}</p>}
                    </div>
                </div>
            </div >

            {showCommentModal && <CommentModal post={post} onSubmit={handleCreateComment} onClose={() => setShowCommentModal(false)} />}
            {errors.global && <p>{errors.global}</p>}

        </>
    )
}