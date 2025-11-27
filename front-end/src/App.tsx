import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Register from "./pages/connexion/Register";
import Login from "./pages/connexion/Login";
import { AuthProvider } from "./context/AuthContext";
import CreatePost from "./pages/post/AddPost";
import SeePost from "./pages/post/SeePost";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import SeeProfil from "./pages/profil/SeeProfil";


export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/post/:id" element={<SeePost />} />
                    <Route path="/post/add" element={<CreatePost />} />
                    <Route path="/profil/:id" element={<SeeProfil/>} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>

    );
}
