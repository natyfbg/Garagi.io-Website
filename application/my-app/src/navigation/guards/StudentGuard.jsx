import { Navigate, Outlet, useLocation } from "react-router";
import FullscreenLoader from "../../components/FullscreenLoader";
import NavBar from "../../components/Nav";
import BasicLayout from "../../layouts/BasicLayout";
import { useGetLoggedInStudentQuery } from "../../services/student";

const StudentGuard = () => {
    const location = useLocation();
    const { isLoading, error } = useGetLoggedInStudentQuery();

    if (isLoading) {
        return <FullscreenLoader />
    }

    if (error) {
        return <Navigate to="/login" state={{ from: location.pathname }} />
    }

    return (
        <BasicLayout />
    );
};

export default StudentGuard;