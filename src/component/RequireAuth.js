/* import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const requireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
} */