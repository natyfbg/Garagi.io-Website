import { Outlet, useLocation } from "react-router";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import useGoogleAnalyticsVisited from "../hooks/useGoogleAnalyticsVisited";

const BasicLayout = () => {
    const location = useLocation();

    useGoogleAnalyticsVisited(location)

    return (
        <div>
            <NavBar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
};

export default BasicLayout;
