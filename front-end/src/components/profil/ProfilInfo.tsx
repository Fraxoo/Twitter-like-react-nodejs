import type { UserType } from "../../types/UserType"
import GoBackComponenet from "../global/GoBackComponenet"
import FollowComponent from "../global/FollowComponent";


export default function ProfilInfo({ userPage }: { userPage: UserType }) {

    console.log(userPage);


    return (
        <>
            <div className="go-back">
                <GoBackComponenet />
                <h1>{userPage.name} {userPage.lastname}</h1>
            </div>
            <div className="profil-info">
                <div className="profil-info-top">
                    <div className="profil-info-name">
                        <h1>{userPage.name} {userPage.lastname}</h1>
                        <p>@{userPage.username}</p>
                    </div>
                    <FollowComponent userId={userPage.id}/>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}