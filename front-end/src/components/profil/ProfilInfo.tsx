import type { UserType } from "../../types/UserType"
import GoBackComponenet from "../global/GoBackComponenet"


export default function ProfilInfo({userPage} : {userPage:UserType}){


    return(
        <div>
            <div>
                <GoBackComponenet/>
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