

export default function ProfilFeedChoices({ selectedFeed, setSelectedFeed }: { selectedFeed: string, setSelectedFeed: (value: string) => void }) {



    return (
        <div className="profil-feed-choices">
            <div onClick={() => setSelectedFeed("posts")} className="profil-feed-choices-div">
                <p className={selectedFeed === "posts" ? "profil-feed-choices-selected" : "profil-feed-choices-not-selected"} >Posts</p>
            </div>
            <div onClick={() => setSelectedFeed("responses")} className="profil-feed-choices-div">
                <p className={selectedFeed === "responses" ? "profil-feed-choices-selected" : "profil-feed-choices-not-selected"} >Réponses</p>
            </div>
            <div onClick={() => setSelectedFeed("media")} className="profil-feed-choices-div">
                <p className={selectedFeed === "media" ? "profil-feed-choices-selected" : "profil-feed-choices-not-selected"}>Média</p>
            </div>
            <div onClick={() => setSelectedFeed("likes")} className="profil-feed-choices-div">
                <p className={selectedFeed === "likes" ? "profil-feed-choices-selected" : "profil-feed-choices-not-selected"}>J'aime</p>
            </div>
        </div>
    )
}