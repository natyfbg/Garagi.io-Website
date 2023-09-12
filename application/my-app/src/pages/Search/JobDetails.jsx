/*global google*/
import React, {useEffect} from "react";
import { JOB_SALARY, JOB_TYPE_NAMES, useApplyJobMutation, useGetJobPostDetailsQuery } from "../../services/posts";
import {useParams, useNavigate} from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import FullscreenLoader from "../../components/FullscreenLoader";
import dayjs from "dayjs";
import { toast, snackbar } from "tailwind-toast";
import { useGetLoggedInStudentApplicationsQuery } from "../../services/student";
import { MAPS_API_KEY } from "../../utils/constants";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function JobDetails() {
    const navigate = useNavigate();
    const { isLoadingStudent, errorStudent } = useAuthentication();
    const [showModal, setShowModal] = React.useState(false);
    const [alreadyApplied, setAlreadyApplied] = React.useState(false);
    const [center, setCenter] = React.useState({ lat: 37.733795, lng: -122.446747 });
    let { id } = useParams();
    const [ applyJob, { isLoading: isApplying } ] = useApplyJobMutation();
    const { data: studentApplications } = useGetLoggedInStudentApplicationsQuery();
    const {data, error, isLoading} = useGetJobPostDetailsQuery(id);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: MAPS_API_KEY,
        libraries: ['places'],
    })

    


    useEffect(() => {
        if (studentApplications && data) {
            setAlreadyApplied(studentApplications.findIndex((a) => a.postId === data.id) > -1);
        }
    }, [studentApplications, data]);

    useEffect(() => {
        const findPlace = async () => {
            const geocoder = new google.maps.Geocoder();
            const result = await geocoder.geocode({ 'address': data.location });

            if (result.results.length > 0) {
                console.log({ lat: result.results[0].geometry.location.lat(), lng: result.results[0].geometry.location.lng()})
                setCenter({ lat: result.results[0].geometry.location.lat(), lng: result.results[0].geometry.location.lng()});
            }
        };

        if (isLoaded && data && data.location) {
            findPlace();
        }
    }, [isLoaded, data])

    if (!isLoaded || (isLoading && !data)) {
        return <FullscreenLoader />;
    }

    return (
        <div className="bg-sky-300 h-screen ">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {showModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Apply to {data.title}?
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        By clicking apply, you agree to send your information to {data.company.name}.
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-sky-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() =>
                                            applyJob(data.id)
                                                .unwrap()
                                                .then((payload) => {
                                                    toast().default('Success!', 'You\'ve successfully applied!').show()
                                                    setShowModal(false);
                                                    navigate("/");
                                                })
                                                .catch((error => {
                                                    toast().default('Bummer!', 'You\'ve failed to apply!').show()
                                                    console.log(error)
                                                    setShowModal(false);
                                                }))
                                        }
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}

            <div className="py-16 bg-sky-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col min-w-0 bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {data.title}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                                    {data.company.name} { data.location && `- ${data.location}` }
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-4">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    {JOB_TYPE_NAMES[data.type].toUpperCase()}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                    <span className="italic">{dayjs(data.createdAt).fromNow()}</span>
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                    Estimated salary - { JOB_SALARY[data.salary] === 'Not specified' ? JOB_SALARY[data.salary] :`${JOB_SALARY[data.salary]} per year`}
                                </div>
                                <br />
                                {
                                    isLoadingStudent ? (
                                        <></>
                                    ) : errorStudent ? (
                                        <></>
                                    ) : alreadyApplied ? (
                                        <p className="italic bold">
                                            You have already applied to this job
                                        </p>
                                    ) : (
                                        <button
                                            className="bg-sky-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Apply Now
                                        </button>
                                    )
                                }
                            </div>
                            <div className="mt-10 py-10 border-t border-sky-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            Role Description
                                        </p>
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            {data.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="container h-96">
                                <GoogleMap
                                    center={center}
                                    zoom={13}
                                    mapContainerStyle={{ width: '100%', height: '200px', zIndex: '1' }}
                                    options={{
                                        zoomControl: false,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false
                                    }}
                                >
                                    <Marker position={center} />
                                </GoogleMap>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
