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
    image_url?: string | null;
    createdAt: string;
    user: UserType;
};

type CommentModalProps = {
    post: PostType;
    onClose: () => void;
    onSubmit: (data: { content: string }) => void;
};

export default function CommentModal({ post, onClose, onSubmit }: CommentModalProps) {
    const [content, setContent] = useState<{ content: string }>({
        content: ""
    });

    function handleSend() {
        console.log(content);
        onSubmit(content);   
        onClose();
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>

                <h3>Répondre à @{post.user.username}</h3>

                <input
                    type="text"
                    name="content"
                    value={content.content}
                    onChange={(e) => setContent({ content: e.target.value })}
                    placeholder="Votre commentaire..."
                />

                <div className="modal-actions">
                    <button onClick={onClose}>Annuler</button>
                    <button onClick={handleSend}>Commenter</button>
                </div>

            </div>
        </div>
    );
}
