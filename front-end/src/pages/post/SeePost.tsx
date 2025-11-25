import Loading from "../../components/global/LoadingComponents"
import Header from "../Header/Header"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router";
import SeePostOwnerComponent from "../../components/global/SeePostOwnerComponent";
import "./post.css"


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

export default function SeePost() {

    const [post, setPost] = useState<PostType>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [hasMore,setHasMore] = useState(true)

    const postId = useParams();
    console.log(postId);
    console.log(post);
        


    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await fetch(`http://localhost:8000/post/get/${postId.id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })

                const data = await res.json();
                if (!res.ok) {
                    setErrors({ global: "Erreur serveur" });
                    return;
                }
                setHasMore(data.hasMore)
                setPost(data.post);
            } catch (err) {
                console.error(err)
            }
        }

        loadPost();
    }, [postId])



    return (
        <div className="content">
            <Header />
            <main>
                <div className="back-home">
                    <Link to={"/home"}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <h2>Post</h2>
                </div>
                {post && <SeePostOwnerComponent  post={post}/>}
                {errors.global && <p className="error">{errors.global}</p>}
            </main>
            <div className="filter">
                <Loading />
            </div>
        </div>
    )
}