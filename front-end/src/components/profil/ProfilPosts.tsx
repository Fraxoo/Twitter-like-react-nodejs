import type { PostType } from "../../types/PostType"
import Loading from "../global/LoadingComponents";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCommentComponent from "../global/PostCommentComponent";


export default function ProfilPost({
    posts,
    loadNext,
    hasMore
}: {
    posts: PostType[];
    loadNext: () => void;
    hasMore: boolean;
}) {   


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

        </div>

    )// changer les messages d'erreur ne sont pas au bon format (regarder register et connexion )
}