import type { UserType } from "../../types/UserType"
import GoBackComponenet from "../global/GoBackComponenet"


export default function ProfilInfo({ userPage }: { userPage: UserType }) {

    console.log(userPage);
    

    return (
        <div>
            <div className="go-back">
                <GoBackComponenet />
                <h1>{userPage.name} {userPage.lastname}</h1>

            </div>
            <div className="profil-info-name">
                <h1>{userPage.name} {userPage.lastname}</h1>
                <p>@{userPage.username}</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}