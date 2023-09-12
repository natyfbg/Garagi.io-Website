import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetLoggedInAdminQuery } from "../../services/admin";
import { logout } from '../../store/auth.slice';

const AdminMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: admin } = useGetLoggedInAdminQuery();
    
    return (
        <div id="sidebar" className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden 
            transition-transform duration-300 ease-in-out" x-show="sidenav" >
            <div className="space-y-6 md:space-y-10 mt-10">
                <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">Garage.io</h1>
                <div id="profile" className="space-y-3">

                    <div>
                        <h2 className="font-medium text-s md:text-s text-center text-teal-500">
                        {admin?.username}
                        </h2>
                        <p className="text-s text-gray-500 text-center">Administrator</p>
                        <p
                            className="text-s text-teal-500 text-center hover:underline cursor-pointer"
                            onClick={() => {
                                dispatch(logout());
                                window.location.href = "/";
                            }}
                        >
                            Log out
                        </p>
                    </div>
                </div>

                <div id="menu" class="flex flex-col space-y-2">

                    {/* dashboard */}
                    <a onClick={() => navigate('/admin/dashboard')}className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500
                        hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                        <svg className="w-6 h-6 fill-current inline-block" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 
                            2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 
                            00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11
                                13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                        <span class="">Dashboard</span>
                    </a>

                    {/* Matching */}
                    <a 
                        onClick={() => navigate('/admin/matching')}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 
                            hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                            ></path>
                            <path
                                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                            ></path>
                        </svg>
                        <span className="">Matching</span>
                    </a>


                </div>
            </div>
        </div>
    );
};

export default AdminMenu;