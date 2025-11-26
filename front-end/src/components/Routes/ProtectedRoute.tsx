// src/components/ProtectedRoute.tsx
import { Navigate,Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Loading from "../global/LoadingComponents";


export default function ProtectedRoute(): React.JSX.Element {
    const { user, loading } = useAuth();

    if (loading) return <Loading/>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>;
}
