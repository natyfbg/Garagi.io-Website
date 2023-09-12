import { Link } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useGetLoggedInCompanyQuery } from '../services/company';
import { useGetLoggedInStudentQuery } from '../services/student';
import { API_URL } from '../utils/constants';

export default function NavBar() {
    const { isLoadingCompany, errorStudent, errorCompany, errorAdmin } = useAuthentication();
    const isAuthenticated = !errorStudent || !errorCompany || !errorAdmin;

    const { data: company } = useGetLoggedInCompanyQuery();
    const { data: student } = useGetLoggedInStudentQuery();

    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="items-center justify-between py-3 md:py-5 md:block">
                        <Link to="/">
                            <h2 className="text-2xl font-bold text-gray-500">Garage.io</h2>
                        </Link>
                    </div>
                </div>
                <div className="visible space-x-2 inline-block">
                    {/* <HiOutlineBell className="h-7 w-7 items-center inline-flex text-slate-500 hover:text-slate-400">
                    </HiOutlineBell> */}
                    {/*
                        <a
                        href="javascript:void(0)"
                        className="text-sky-500 hover:text-sky-400"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                        </svg>
                        </a>
                    */}
                    {
                        (!isLoadingCompany && !errorCompany) && (
                            <Link
                                to="/company/posts/create"
                                className="px-4 py-2 text-white bg-sky-500 rounded-md shadow hover:bg-sky-400"
                            >
                                Post a Job
                            </Link>
                        )
                    }
                    {
                        !isAuthenticated && (
                            <Link
                                to="/login"
                                className="px-4 py-2 text-white bg-sky-500 rounded-md shadow hover:bg-sky-400"
                            >
                                Login
                            </Link>
                        )
                    }

                    {/* if in homepage click this icon it will turn to login page,
                        might be change the path to student */}
                    {
                        isAuthenticated && (
                            <Link to={`/${
                                !errorCompany ? 'company' : !errorStudent ? 'student' : 'admin'
                            }`}>
                                <img  className="inline-block h-12 w-12 rounded-full ring-2 ring-grey" src={`${
                                    !errorCompany ? `${API_URL}/company/${company?.id}/logo` : !errorStudent ? `${API_URL}/student/${student?.id}/profile_picture` : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                                }`} alt="{user.handle}"/>
                            </Link>
                        )
                    }
                   
                    {/* this part should be when the users login and show the icon they upload or the original icon */}
                    {/* <a href="student">
                        <img  className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="data from backend" alt="{user.handle}"/>
                    </a> */}

                </div>
            </div>
        </nav>
    );
}
