import { useEffect, useState } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import { useFetchCompaniesQuery, useFetchPostsQuery, useFetchStudentsQuery } from "../../services/admin";

export default function AdministrationDashboardPage() {
    const [companies, setCompanies] = useState([]);
    const [students, setStudents] = useState([]);
    const [posts, setPosts] = useState([]);


    const { data: studentsLoaded } = useFetchStudentsQuery();
    const { data: companiesLoaded } = useFetchCompaniesQuery();
    const { data: postsLoaded } = useFetchPostsQuery();


    useEffect(() => {
        if (studentsLoaded) {
            setStudents(studentsLoaded);
        }
    }, [studentsLoaded]);

    useEffect(() => {
        if (companiesLoaded) {
            setCompanies(companiesLoaded);
        }
    }, [companiesLoaded])

    useEffect(() => {
        if (postsLoaded) {
            setPosts(postsLoaded);
        }
    }, [postsLoaded]);


    return (
        <div id="view" className="h-full flex flex-row overflow-hidden" x-data="{ sidenav: true }">

            <AdminMenu />

            <div className="px-6 pt-6 2xl:container">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Companies list */}
                    <div className="md:col-span-2 lg:col-span-1 overflow-auto h-screen" >
                        <h5 className="text-xl text-gray-600 text-center">Companies</h5>
                        <div className="h-96 py-3 px-2 space-y-6 bg-white">

                            {
                                companies.map((company) => (
                                    <div key={company.id}>   
                                        <div className="mt-2 flex justify-center gap-4">
                                            <a href="#" className="text-3xl font-bold text-gray-700">{company.name}</a>
                                        </div>
                                        <div className="flex justify-center items-end gap-1 text-green-500">
                                            <div>{posts.reduce((acc, p) => (acc + ((p.companyId === company.id) ? 1 : 0)), 0)}</div>
                                            <span className="block text-center text-gray-500">'s job posts</span>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>



                   {/* user list */}

                    <div className="md:col-span-2 lg:col-span-1 overflow-auto h-screen">
                        <h5 className="text-xl text-gray-600 text-center">Students</h5>
                        <div className="h-96 py-2 px-3 space-y-6 bg-white">
                            {
                                students.map((student) => (
                                    <div key={student.id}>
                                        <div className="mt-2 flex justify-center gap-4">
                                            <a href="#" className="text-3xl font-bold text-gray-700">{student.firstname} {student.name}</a>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>



                    {/* all jobs list */}

                    <div className="md:col-span-2 lg:col-span-1 overflow-auto">
                        <h5 className="text-xl text-gray-600 text-center">Job Posts</h5>
                        <div className="h-96 py-3 px-2 text-gray-600 space-y-6 bg-white">
                            {
                                posts.map((post) => (
                                    <div key={post.id}>
                                        <div className="mt-2 flex justify-center gap-4">
                                        <a href={`/posts/${post.id}`} className="text-3xl font-bold text-gray-700">{post.title}</a>

                                        </div>

                                        <div className="flex justify-center items-end gap-1 text-green-500">
                                            <span className="block text-center text-gray-500 ml-2">company:</span>
                                            <div>{companies.find((c) => c.id === post.companyId)?.name}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}