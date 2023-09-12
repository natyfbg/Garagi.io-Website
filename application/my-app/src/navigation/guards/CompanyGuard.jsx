import { useGetLoggedInCompanyQuery } from "../../services/company";
import { Navigate, useLocation } from "react-router";
import FullscreenLoader from "../../components/FullscreenLoader";
import BasicLayout from "../../layouts/BasicLayout";

const CompanyGuard = () => {
    const location = useLocation();
    const { isLoading, error } = useGetLoggedInCompanyQuery();

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

export default CompanyGuard;