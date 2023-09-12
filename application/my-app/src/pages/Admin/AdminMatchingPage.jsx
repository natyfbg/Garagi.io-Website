import { useEffect, useState } from "react";
import AdminMenu from "../../components/admin/AdminMenu";
import { useFetchStudentsQuery, useSendJobAlertMutation } from "../../services/admin";

const AdminMatchingPage = () => {
    const [sendAlert, { isLoading }] = useSendJobAlertMutation();
    const [students, setStudents] = useState([]);
    const { data: studentsLoaded } = useFetchStudentsQuery();

    useEffect(() => {
        if (studentsLoaded) {
            setStudents(studentsLoaded);
        }
    }, [studentsLoaded]);


    return (
        <div id="view" className="h-full flex flex-row overflow-hidden" x-data="{ sidenav: true }">
            <AdminMenu />

            <div className="px-6 pt-6 2xl:container">
                <h5 className="text-xl text-gray-600 text-center">Job alerts</h5>

                <div className="h-96 py-2 px-3 space-y-6 bg-white">
                    {
                        students.map((student) => (
                            <div key={student.id}>
                                <div className="mt-2 flex justify-center gap-4 items-center">
                                    <a href="#" className="text-3xl font-bold text-gray-700">{student.firstname} {student.name}</a>

                                    <button
                                        className="flex bg-sky-500 mt-5 py-2 px-2 rounded-2xl hover:bg-sky-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                                        onClick={() => sendAlert(student.id)}
                                    >
                                        {
                                            isLoading && (
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )
                                        }

                                        Send job alert
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
        
        </div>
    );
}

export default AdminMatchingPage;