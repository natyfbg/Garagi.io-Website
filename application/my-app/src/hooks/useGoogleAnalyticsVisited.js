import { useEffect } from "react";
import ReactGA from 'react-ga';

const useGoogleAnalyticsVisited = (location) => {
    useEffect(() => {
        ReactGA.pageview(location.pathname);
    }, [location]);
};

export default useGoogleAnalyticsVisited;