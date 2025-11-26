import { useEffect, useState } from "react"
import PostCommentComponent from "./PostCommentComponent"
import InfiniteScroll from "react-infinite-scroll-component"
import Loading from "./LoadingComponents";
import type  { PostType } from "../../types/PostType";

export default function Feed() {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/post/get/all/${offset}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });
                const data = await res.json();

                if (!res.ok) {
                    setErrors({ global: "Erreur serveur" })
                    return;
                }
                if (data.length === 0) {
                    setHasMore(false);
                    return;
                }
                setPosts(prev => [...prev, ...data]);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData()
    }, [offset])

    function loadNext() {
        setOffset((prev) => prev + 10); // se baser sur le offset par sur le chargement de page sinon doublon les key
    }


    return (

        <div>
            
            <InfiniteScroll
                dataLength={posts.length} //This is important field to render the next data
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
                {posts.map((post) => {
                    return <PostCommentComponent key={post.id} post={post} />
                })}
            </InfiniteScroll> 
            {errors.global && <p>{errors.global}</p>} 
        </div>

    )// changer les messages d'erreur ne sont pas au bon format (regarder register et connexion )
}