import Loading from "../../components/global/LoadingComponents"
import Header from "../Header/Header"
import FeedChoice from "../../components/Home/FeedChoiceComponents";
import Feed from "../../components/global/FeedComponents";
import "../../style.css";
import "./home.css"
import { useAuth } from "../../context/AuthContext";



export default function Home() {

    const {user} = useAuth();
    console.log(user);


    
   



    return (
        <div className="content">
            <Header />
            <main>
                <h1>USERID : {user?.id}</h1>
            
                <FeedChoice />
                <Feed />
            </main>
            <div className="filter">
                <Loading />

            </div>
        </div>
    )
}