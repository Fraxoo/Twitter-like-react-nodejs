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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`http://localhost:8000/users/profil/${id}/posts/${offset}`,
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
				if (data.length === 0) {
					setHasMore(false);
					return;
				}
				setUserPage(data.user);
				setPosts((prev) => [...prev, ...data.posts]);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [offset]);

	function loadNext() {
		setOffset((prev) => prev + 10); // se baser sur le offset par sur le chargement de page sinon doublon les key
	}

	return (
		<div className="content">
			<Header />
			<main id="scrollable">
				{userPage && <ProfilInfo userPage={userPage} />}
				<ProfilFeedChoices/>
				<ProfilPost posts={posts} loadNext={loadNext} hasMore={hasMore} />
			</main>
			<div className="filter">
				<Loading />
			</div>
		</div>
	);
}
