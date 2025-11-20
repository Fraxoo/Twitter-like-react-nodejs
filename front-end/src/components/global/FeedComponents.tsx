import { useEffect, useState } from "react"
import PostComponent from "./PostComponent"

type PostType = {
    id: number;
    content: string;
    image_url?: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        lastname: string;
        username: string;
    };
};

export default function Feed() {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const res = await fetch("http://localhost:8000/post/get", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();

                if (!res.ok) {
                    setErrors({ global: "Erreur serveur" })
                    return;
                }
                console.log(data);
                
                setPosts(data);
                console.log(posts);
            } catch (err) {
                console.error(err);
            }

        }

        loadPosts();
    }, [])

    return (

        <div>
            {posts.map((post) => {
                return <PostComponent key={post.id} post={post} />
            })}

        </div>

    )
}