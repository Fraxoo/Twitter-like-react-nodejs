

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

export default function SeePostOwnerComponent({ post }: { post: PostType }) {


    return (
        <div className="see-post-owner-card">
            <div className="see-post-owner-card-profil">
                {/* image */}
                <h1>{post.user.name} {post.user.lastname}</h1>
                <p className="see-post-owner-card-profil-greyed-out">@{post.user.username}</p>
            </div >

            <div className="see-post-owner-card-content">
                <p>{post.content}</p>
            </div>

            <div className="see-post-owner-card-modify">

            </div>

            <div className="see-post-owner-card-stats">
                <div className="see-post-owner-card-stats-comment">
                    <button title="comment" ><i className="fa-regular fa-comment"></i></button>
                    <p>{post.commentCount}</p>
                </div>
            </div>

            <div className="see-post-owner-card-respond">
                {/* image */}
                <form action="">
                    <input type="text" name="content" placeholder="Postez votre réponse" />
                    <button>Répondre</button>
                </form>
            </div>
        </div>
    )
}