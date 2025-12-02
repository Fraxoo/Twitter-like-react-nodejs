import { useState } from "react";
import "./modal.css"
import { Link } from "react-router";

type UserType = {
    id: number;
    name: string;
    lastname: string;
    username: string;
};

type PostType = {
    id: number;
    content: string;
    createdAt: string;
    user: UserType;
};

type CommentModalProps = {
    post: PostType | null;
    onClose: () => void;
};

export default function CommentModal({ post, onClose }: CommentModalProps) {

    const [content, setContent] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setFiles(Array.from(e.target.files));
    }

    async function handleSend() {
        if (!content.trim()) {
            setError("Le contenu est requis.");
            return;
        }

        const formData = new FormData();
        formData.append("content", content.trim());

        files.forEach((file) => {
            formData.append("medias", file);
        });

        try {
            setLoading(true);
            setError(null);


            const url = post
                ? `http://localhost:8000/post/create/${post.id}`
                : `http://localhost:8000/post/create`;

            const res = await fetch(url, {
                method: "POST",
                credentials: "include",
                body: formData,
            });


            const data = await res.json();
            console.log(data);
            console.log(res);


            if (!res.ok) {
                setError(data?.error || "Erreur lors de l'envoi du commentaire.");
                console.log(error);
                console.log(res);


                return;
            }

            setContent("");
            setFiles([]);
            onClose();

        } catch (err) {
            console.error(err);
            setError("Erreur réseau.");
        } finally {
            setLoading(false);
        }
    }




    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                <div onClick={onClose} className="close">
                    <i className="fa-solid fa-x"></i>
                </div>
                <div className="modal-content">
                {post &&

                    <div className="modal-user">
                        <div className="modal-user-content">
                            <div className="flex gap-03">
                                <p className="strong">{post.user.name} {post.user.lastname}</p>
                                <p className="greyed">@{post.user.username}</p>
                            </div>
                            <p>{post.content}</p>
                        </div>
                        <p>En réponse a <Link className="modal-go-to-profil" to={`/profil/${post.user.id}`}>@{post.user.username} </Link> </p>
                    </div>

                }

                <textarea
                    className="tweet-input"
                    placeholder={post ? "Postez votre réponse" : "Quoi de neuf ?"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                </div>

                <div className="modal-bottom">
                    <input
                        className="hidden"
                        id="file-input"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFiles}
                        aria-label="Choisir des fichiers"
                    />

                    
                    <label htmlFor="file-input">
                        <div className="modal-file-input">
                            <i className="fa-regular fa-file"></i>
                        </div>
                    </label>

                    <div className="modal-actions">
                        <button
                            className={content.length > 0 ? "modal-actions-submit-on" : "modal-actions-submit-off"}
                            onClick={content.length > 0 ? handleSend : undefined}
                            disabled={loading || content.length === 0}
                        >
                            {loading ? "Envoi..." : post ? "Commenter" : "Poster"}
                        </button>
                    </div>
                </div>

                {files.length > 0 && (
                    <ul className="file-preview">
                        {files.map((f) => (
                            <li key={f.name}>{f.name}</li>
                        ))}
                    </ul>
                )}

                {error && <p className="error">{error}</p>}


            </div>
        </div>
    );
}
