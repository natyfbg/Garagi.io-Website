import { Navigate, Outlet, useLocation } from "react-router";
import FullscreenLoader from "../../components/FullscreenLoader";
import { useGetLoggedInStudentQuery } from "../../services/student";
import { useGetLoggedInCompanyQuery } from "../../services/company";
import { useGetLoggedInAdminQuery } from "../../services/admin";
import { useAuthentication } from "../../hooks/useAuthentication";
import useGoogleAnalyticsVisited from "../../hooks/useGoogleAnalyticsVisited";

const GuestGuard = () => {
    const location = useLocation();
    const {
        isLoadingStudent,
        isLoadingCompany,
        isLoadingAdmin,
        errorStudent,
        errorCompany,
        errorAdmin
    } = useAuthentication();

    useGoogleAnalyticsVisited(location);

    if (isLoadingStudent || isLoadingCompany || isLoadingAdmin) {
        return <FullscreenLoader />
    }

    if (errorStudent && errorCompany && errorAdmin) {
        return <Outlet />
    }

    const newLocation = !errorStudent ? '/student' : !errorCompany ? '/company' : !errorAdmin ? '/admin/dashboard' : '/';

    return <Navigate to={newLocation} state={{ from: location.pathname }} />
};

export default GuestGuard;