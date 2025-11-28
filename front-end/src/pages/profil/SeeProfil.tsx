import Header from "../Header/Header";
import Loading from "../../components/global/LoadingComponents";
import "./profil.css";
import ProfilInfo from "../../components/profil/ProfilInfo";
import ProfilPost from "../../components/profil/ProfilPosts";
import { useState, useEffect } from "react";
import type { PostType } from "../../types/PostType";
import { useParams } from "react-router";
import type { UserType } from "../../types/UserType";
import ProfilFeedChoices from "../../components/profil/ProfilFeedChoices";


export default function SeeProfil() {
	const { id } = useParams();

	const [userPage, setUserPage] = useState<UserType>();
	const [posts, setPosts] = useState<PostType[]>([]);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [selectedFeed, setSelectedFeed] = useState("posts");
	const [loading, setLoading] = useState(true);


	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await fetch(
				`http://localhost:8000/users/profil/${id}/${selectedFeed}/${offset}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);
			const data = await res.json();
			console.log(data);

			if (!res.ok) {
				setErrors({ global: "Erreur serveur" });
				return;
			}
			setHasMore(data.hasMore)
			setUserPage(data.user);
			setPosts((prev) => [...prev, ...data.posts]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false)
		}
	};

	useEffect(() => {
		if (posts.length === 0 && offset === 0) return;

		fetchData();
	}, [offset]);



	useEffect(() => {
		setPosts([]);
		setOffset(0);
		fetchData();
	}, [selectedFeed]);


	function loadNext() {
		setOffset((prev) => prev + 10); // se baser sur le offset par sur le chargement de page sinon doublon les key
	}

	console.log(errors);


	return (
		<div className="content">
			<Header />
			<main id="scrollable">
				{userPage && <ProfilInfo userPage={userPage} />}
				<ProfilFeedChoices selectedFeed={selectedFeed} setSelectedFeed={setSelectedFeed} />
				<ProfilPost posts={posts} loadNext={loadNext} hasMore={hasMore} />
				{loading && <Loading />}
			</main>
			<div className="filter">
				<Loading />
			</div>
		</div>
	);
}
