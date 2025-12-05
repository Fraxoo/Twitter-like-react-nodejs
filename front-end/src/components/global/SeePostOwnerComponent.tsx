import { useState } from "react";
import PostStatsComponents from "./PostStatsComponents";
import type { PostType } from "../../types/PostType";
import ImageDisplay from "./ImageDisplayComponent";


export default function SeePostOwnerComponent({ post }: { post: PostType }) {

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [content, setContent] = useState<{ content: string }>({
        content: ""
    })

    async function handleCreateComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8000/post/create/${post.id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(content)
            });

            const result = await res.json();
            if (!res.ok) {
                console.error(result);
                setErrors({ global: "Erreur serveur" });
                return;
            }

            console.log("Commentaire créé :", result);

        } catch (error) {
            console.error("Erreur serveur:", error);
            setErrors({ global: "Erreur veuillez réesayer" })
        }
    }


    return (
        <div className="see-post-owner-card">
            <div className="see-post-owner-card-profil">
                {/* image */}
                <h1>{post.user.name} {post.user.lastname}</h1>
                <p className="see-post-owner-card-profil-greyed-out">@{post.user.username}</p>
            </div >

            <div className="see-post-owner-card-content">
                <p>{post.content}</p>
                {post.medias && <ImageDisplay medias={post.medias} />}

            </div>

            <div className="see-post-owner-card-modify">

            </div>

            <div className="see-post-owner-card-stats">
                <PostStatsComponents post={post} />
            </div>

            <div className="see-post-owner-card-respond">
                {/* image */}
                <form onSubmit={handleCreateComment}>
                    <input type="text" onChange={(e) => setContent({ content: e.target.value })} name="content" placeholder="Postez votre  réponse" />
                    <button>Répondre</button>
                </form>
                {errors.global && <p className="error">{errors.global}</p>}
            </div>
        </div>
    )
}