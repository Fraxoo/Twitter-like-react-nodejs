import { useState } from "react";
import "./post.css"

export default function CreatePost() {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!content.trim()) {
            return setError("Le contenu du post ne peut pas être vide.");
        }

        const formData = new FormData();
        formData.append("content", content);
        if (file) formData.append("image", file);

        try {
            setLoading(true);

            const res = await fetch("http://localhost:8000/post/create", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                return setError(data.message || "Une erreur s'est produite.");
            }

            setSuccess("Post créé avec succès !");
            setContent("");
            setFile(null);

        } catch (err) {
            setError("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    }


    return (


        <div className="post-container">
            <h1>Ajoutez un post</h1>
            <form className="post-form" action="" onSubmit={handleSubmit} >
                <input className="post-form-input" type="text" placeholder="Quoi de neuf?" name="content" onChange={(e) => setContent(e.target.value)} />
                <button>Ajoutez</button>
            </form>
            {success && <p>{success}</p>}
        </div>
    )
}