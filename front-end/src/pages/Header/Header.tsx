import logo from "../../assets/images/logo-white.png";
import { Link } from "react-router";
import "./header.css"


export default function Header() {


    return (
        <header>
            <div className="header-content">
                <Link to={"/home"}>
                    <img src={logo} alt="logo" />
                </Link>
                <Link to={"/home"}>
                    <div className="header-list">
                        <i className="fa-regular fa-house"></i>
                        <h1>Acceuil</h1>
                    </div>
                </Link>
                <Link to={"/explore"}>
                    <div className="header-list">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <h1>Explorer</h1>
                    </div>
                </Link>
                <Link to={"/notifications"}>
                    <div className="header-list">
                        <i className="fa-regular fa-bell"></i>
                        <h1>notifications</h1>
                    </div>
                </Link>
                <Link to={"/messages"}>
                    <div className="header-list">
                        <i className="fa-regular fa-envelope"></i>
                        <h1>Messages</h1>
                    </div>
                </Link>
                <Link to={"/profil/:id"}>
                    <div className="header-list">
                        <i className="fa-regular fa-user"></i>
                        <h1>Profil</h1>
                    </div>
                </Link>
                <Link to={"/settings"}>
                    <div className="header-list">
                        <i className="fa-solid fa-gear"></i>
                        <h1>Paramétres</h1>
                    </div>
                </Link>
                <Link className="header-post" to={"/compose/post"}>
                    <p>Poster</p>
                </Link>
            </div>
        </header>
    )
}