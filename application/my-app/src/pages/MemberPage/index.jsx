import { Navigate, useParams } from "react-router-dom";
import Thomas from "./Thomas";
import Tyler from "./Tyler";
import Jiaming from "./Jiaming";
import Mohammad from "./Mohammad";
import Young from "./Young";
import Nathnael from "./Nathnael";
import Joe from "./Joe";

const PAGES = [
    {
        name: "pr0m3th3usEx",
        page: <Thomas />
    },
    {
        name: "MohammadisTired",
        page: <Mohammad />
    },
    {
        name: "TylerFulinara",
        page: <Tyler />
    },
    {
        name: "AkiZhao614",
        page: <Jiaming />
    },
    {
        name: "xynrgys",
        page: <Young />
    },
    {
        name: "natyfbg",
        page: <Nathnael />
    },
    {
        name: "j0es4nd",
        page: <Joe />
    },
];

function MemberPage() {
    const { username } = useParams();

    console.log(username);
    const selectedPage = PAGES.find(page => page.name === username);

    if (!username || !selectedPage) {
        return <Navigate to="/" />;
    }

    
    return selectedPage.page;
}

export default MemberPage;