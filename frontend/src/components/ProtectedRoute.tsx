// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: JSX.Element;
    role?: "user" | "admin";
}

const ProtectedRoute = ({ children, role }: Props) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {

        return <Navigate to={role === "admin" ? "/admin-login" : "/login"} replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
