import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import AboutUs from "../pages/About";
import MemberPage from "../pages/MemberPage";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import JobDetails from "../pages/Search/JobDetails";
import CompanyJobPosting from "../pages/Company/CompanyJobPosting";
import AdministrationLoginPage from "../pages/Admin/AdministrationLoginpage";

import AdministrationDashboardPage from "../pages/Admin/AdministrationDashboardPage";
import CompanyJobApplicationList from "../pages/Company/CompanyJobAppList";
import CompanyJobList from "../pages/Company/CompanyJobList";
import StudentProfile from "../pages/Student/StudentProfile";
import CompanyProfile from "../pages/Company/CompanyProfile";
import GuestGuard from "./guards/GuestGuard";
import CompanyGuard from "./guards/CompanyGuard";
import StudentGuard from "./guards/StudentGuard";
import AdminGuard from "./guards/AdminGuard";
import BasicLayout from "../layouts/BasicLayout";
import AdminMatchingPage from "../pages/Admin/AdminMatchingPage";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasicLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="post/:id" element={<JobDetails />} />
                    <Route path="about-us">
                        <Route index element={<AboutUs />} />
                        <Route path=":username" element={<MemberPage />} />
                    </Route>
                </Route>

                {/* Guest : Can't access if authenticated */}
                <Route path="/" element={<GuestGuard />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="admin/login" element={<AdministrationLoginPage />} />
                </Route>

                {/* Company authenticated */}
                <Route path="company" element={<CompanyGuard />}>
                    <Route index element={<CompanyProfile />} />                    
                    <Route path="jobApplicationList" element={<CompanyJobApplicationList />} />
                    <Route path="posts">
                        <Route index element={<CompanyJobList />} />
                        <Route path="create" element={<CompanyJobPosting />} />
                    </Route>
                </Route>
                
                {/* Student authenticated */}
                <Route path="student" element={<StudentGuard />}>
                    <Route index element={<StudentProfile />} />
                </Route>

                {/* Admin authenticated */}
                <Route path="admin" element={<AdminGuard />}>
                    <Route path="dashboard" element={<AdministrationDashboardPage />} />
                    <Route path="matching" element={<AdminMatchingPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
