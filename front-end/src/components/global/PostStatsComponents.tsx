import { useState } from "react";



type PostType = {
    id: number;
    content: string;
    image_url?: string | null;
    createdAt: string;
    commentCount: number;
    isLiked: boolean;
    likesCount: number;
    user: {
        id: number;
        name: string;
        lastname: string;
        username: string;
    };
};

export default function PostStatsComponents({ post }: { post: PostType }) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
    const [isLiked, setIsLiked] = useState(post.isLiked);
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

            setIsLiked(true)
        } catch (err) {
            console.error(err)
        }
    }



    return (

        <div className="post-stats">
            <div className="post-stats-comment">
                <button title="comment" ><i className="fa-regular fa-comment"></i></button>
                <p>{post.commentCount}</p>
            </div>
            <div className="post-stats-like">
                {isLiked ? <i onClick={handleRemoveLike} className="fa-solid liked fa-heart"></i> : <i onClick={handleAddLike} className="fa-regular fa-heart"></i>}
            </div>
        

        </div>
    )
}