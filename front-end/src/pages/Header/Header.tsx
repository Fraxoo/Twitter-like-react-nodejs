import logo from "../../assets/images/logo-white.png";
import { Link, useNavigate } from "react-router";
import "./header.css"
import { useAuth } from "../../context/AuthContext";
export default function Header() {

    const { logout, user } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {
        logout();
        navigate("/login")
    }

    return (
        <header>
            <div className="header-container">
                <div className="header-content-top">
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
                            <h1>Notifications</h1>
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
                    <button onClick={handleLogout}>Deconnexion</button>
                    <Link className="header-post" to={"/post"}>
                        <p>Poster</p>
                    </Link>
                </div>
                <div className="header-content-bottom">
                    <div>
                        {user && <p>{user.name} {user.lastname}</p>}
                    </div>
                    {user && <p>{user.username}</p>}
                </div>
            </div>
        </header>
    )
}