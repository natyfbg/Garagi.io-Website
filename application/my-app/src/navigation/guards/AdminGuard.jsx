import { Navigate, Outlet, useLocation } from "react-router";
import FullscreenLoader from "../../components/FullscreenLoader";
import { useGetLoggedInAdminQuery } from "../../services/admin";

const AdminGuard = () => {
    const location = useLocation();
    const { isLoading, error } = useGetLoggedInAdminQuery();

    if (isLoading) {
        return <FullscreenLoader />
    }

    if (error) {
        return <Navigate to="/login" state={{ from: location.pathname }} />
    }

    return <Outlet />
};

export default AdminGuard;