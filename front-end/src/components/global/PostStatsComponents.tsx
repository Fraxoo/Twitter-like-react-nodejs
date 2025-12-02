import { useState } from "react";
import type { PostType } from "../../types/PostType";
import CommentModal from "../../ui/modal/CommentModal";


export default function PostStatsComponents({ post }: { post: PostType }) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const [showCommentModal, setShowCommentModal] = useState(false);


    const handleRemoveLike = async () => {
        try {
            const res = await fetch(`http://localhost:8000/like/remove/${post.id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (!res.ok) {
                setErrors({ global: "Erreur serveur" });
                return;
            }
            setLikesCount(likesCount - 1)
            setIsLiked(false)
        } catch (err) {
            console.error(err)
        }
    }


    
    const handleAddLike = async () => {
        try {
            const res = await fetch(`http://localhost:8000/like/add/${post.id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (!res.ok) {
                setErrors({ global: "Erreur serveur" });
                return;
            }
            setLikesCount(likesCount + 1)
            setIsLiked(true)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <>
            <div className="post-stats">
                <div className="post-stats-comment" onClick={() => {showCommentModal ? setShowCommentModal(false) : setShowCommentModal(true)}}>
                    <button title="comment">
                        <i className="fa-regular fa-comment"></i>
                    </button>
                    <p>{post.commentCount}</p>
                </div>

                <div
                    onClick={isLiked ? handleRemoveLike : handleAddLike}
                    className={`post-stats-like ${isLiked ? "liked" : "not-liked"}`}
                >
                    <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
                    <p>{likesCount}</p>
                </div>
            </div>

            {showCommentModal && (
                <CommentModal
                    post={post}
                    onClose={() => setShowCommentModal(false)}
                />
            )}
        </>
    );
}
