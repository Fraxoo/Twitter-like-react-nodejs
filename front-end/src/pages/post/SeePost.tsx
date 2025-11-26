import Loading from "../../components/global/LoadingComponents"
import Header from "../Header/Header"
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import SeePostOwnerComponent from "../../components/global/SeePostOwnerComponent";
import "./post.css"
import InfiniteScroll from "react-infinite-scroll-component";
import PostCommentComponent from "../../components/global/PostCommentComponent";
import { useNavigate } from "react-router";


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


export default function SeePost() {
    const navigate = useNavigate();


    const [post, setPost] = useState<PostType>();
    const [replies, setReplies] = useState<PostType[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const { id } = useParams();



    useEffect(() => {
        if (!id) return;

        // Reset state quand l’url change
        setPost(undefined);
        setReplies([]);
        setOffset(0);
        setHasMore(true);

        const loadPostAndFirstReplies = async () => {
            try {
                const res = await fetch(`http://localhost:8000/post/get/${id}/0`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json();
                console.log(data);


                if (!res.ok) {
                    setErrors({ global: "Erreur serveur" });
                    return;
                }

                setPost(data.post);
                setReplies(data.replies);
                setHasMore(data.hasMore);

            } catch (err) {
                console.error(err);
            }
        };

        loadPostAndFirstReplies();
    }, [id]); //permet le rechargement de "la page"


    useEffect(() => {
        if (offset === 0) return;
        if (!id) return;

        const loadMoreReplies = async () => {
            try {
                const res = await fetch(`http://localhost:8000/post/get/${id}/${offset}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json();

                if (!res.ok) {
                    setErrors({ global: "Erreur serveur" });
                    return;
                }

                if (data.replies.length === 0) {
                    setHasMore(false);
                    return;
                }

                setReplies(prev => [...prev, ...data.replies]);
                setHasMore(data.hasMore);

            } catch (err) {
                console.error(err);
            }
        };

        loadMoreReplies();
    }, [offset]); //encore une fois se baser sur l'offset pas le chargement de la page en elle meme 


    function loadNext() {
        setOffset(prev => prev + 10);
    }

    function goBack() {
        navigate(-1)
    }


    return (
        <div className="content">
            <Header />
            <main id="scrollable">
                <div className="go-back">
                    <div className="go-back-button" onClick={goBack}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <h2>Post</h2>
                </div>
                {post && <SeePostOwnerComponent post={post} />}
                {errors.global && <p className="error">{errors.global}</p>}
                <div>
                    <InfiniteScroll
                        dataLength={replies.length} //This is important field to render the next data
                        next={loadNext}
                        hasMore={hasMore}
                        loader={<Loading />}
                        endMessage={
                            <p className="end-message">
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        scrollableTarget="scrollable"

                    >
                        {replies.map((replie) => {
                            return <PostCommentComponent key={replie.id} post={replie} />
                        })}
                    </InfiniteScroll>
                </div>
            </main>
            <div className="filter">
                <Loading />
            </div>
        </div>
    )
}