import Header from "../Header/Header"
import Loading from "../../components/global/LoadingComponents"
import "./profil.css"
import ProfilInfo from "../../components/profil/ProfilInfo"


export default function SeeProfil(){

    




    return(
        <div className="content">
                    <Header />
                    <main id="scrollable">
                        <ProfilInfo />
                    </main>
                    <div className="filter">
                        <Loading />
                    </div>
                </div>
    )
}