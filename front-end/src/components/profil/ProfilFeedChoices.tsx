

export default function ProfilFeedChoices({setSelectedFeed}: { setSelectedFeed : (value: string) => void}){



    return(
        <div className="profil-feed-choices">
            <p onClick={() => setSelectedFeed("posts")}>Posts</p>
            <p onClick={() => setSelectedFeed("responses")}>Réponses</p>
            <p onClick={() => setSelectedFeed("media")}>Média</p>
            <p onClick={() => setSelectedFeed("likes") }>J'aime</p>
        </div>
    )
}