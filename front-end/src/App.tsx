import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Register from "./pages/connexion/Register";
import Login from "./pages/connexion/Login";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>

    );
}
