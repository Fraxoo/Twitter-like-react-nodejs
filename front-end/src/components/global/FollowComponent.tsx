import { useEffect, useState } from "react"



export default function FollowComponent({ userId }: { userId: number }) {

    const [isFollowed, setIsFollowed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);


    useEffect(() => {

        const getIsFollowed = async () => {
            try {
                const res = await fetch(`http://localhost:8000/follow/get/${userId}/isfollowed`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await res.json();

                if (!res.ok) {
                    return;
                }
                setIsFollowed(data)
            } catch (err) {
                console.error(err)
            }
        }

        getIsFollowed();
    }, [userId])

    const handleClick = async () => {
        try {
            if (isFollowed) {
                const res = await fetch(`http://localhost:8000/follow/remove/${userId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await res.json();                

                if (!res.ok) {
                    console.error(res);
                    return;
                }
                setIsFollowed(data.followed);
            } else {
                const res = await fetch(`http://localhost:8000/follow/add/${userId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                const data = await res.json();
                
                if (!res.ok) {
                    console.error(res);
                    return;
                }
                setIsFollowed(data.followed);
            }
        } catch (err) {
            console.error(err)
        }
    }



    return (
        <div className="follow-button">
            <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={isFollowed ? "followed" : "not-followed"}
                onClick={handleClick}>{isFollowed ? isHovering ? "Se désabonner" : "Abonné" : "Suivre"}</button>
        </div>
    )
}