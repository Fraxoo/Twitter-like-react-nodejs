import { useState } from "react";

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
    post: PostType;
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
            formData.append("medias", file); // doit matcher uploadManyMedias
        });

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`http://localhost:8000/post/create/${post.id}`, {
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

                <h3>Répondre à @{post.user.username}</h3>

                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Votre commentaire..."
                />

                <input
                    placeholder="parcourir"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFiles}
                />

                {files.length > 0 && (
                    <ul className="file-preview">
                        {files.map((f) => (
                            <li key={f.name}>{f.name}</li>
                        ))}
                    </ul>
                )}

                {error && <p className="error">{error}</p>}

                <div className="modal-actions">
                    <button onClick={onClose}>Annuler</button>
                    <button onClick={handleSend} disabled={loading}>
                        {loading ? "Envoi..." : "Commenter"}
                    </button>
                </div>

            </div>
        </div>
    );
}
