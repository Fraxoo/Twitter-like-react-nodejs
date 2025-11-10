import Loading from "../../components/global/LoadingComponents"
import Header from "../Header/Header"
import FeedChoice from "../../components/Home/FeedChoiceComponents";
import Feed from "../../components/global/FeedComponents";
import "../../style.css";
import "./home.css"



export default function Home() {


    return (
        <div className="content">
            <Header />
            <main>
                <div className="main-content">
                    <FeedChoice />
                    <Feed />
                </div>
                <Loading />
            </main>
        </div>
    )
}