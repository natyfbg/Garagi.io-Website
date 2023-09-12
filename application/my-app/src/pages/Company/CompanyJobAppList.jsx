import React from "react";

export default function JobDetails() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className="bg-sky-300 h-auto ">
            <br></br>
            <ul>
                <li>
                    <div class="flex justify-center p-5">
                        <div class="block rounded-lg shadow-lg bg-white max-w-none text-center">
                            <div class="py-3 px-6 border-b border-gray-300">
                                Application 0001
                            </div>
                            <div class="p-6">
                                <h5 class="text-gray-900 text-xl font-medium mb-2">Applicant Name</h5>
                                <p class="text-gray-700 text-base mb-4">
                                    Applicant Skills/Description
                                </p>
                                <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    View Applicant Profile
                                </button>
                            </div>
                            <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
                                Applied: 2 days ago
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex justify-center p-5">
                        <div className="block rounded-lg shadow-lg bg-white max-w-none text-center">
                            <div className="py-3 px-6 border-b border-gray-300">
                                Application 0002
                            </div>
                            <div className="p-6">
                                <h5 className="text-gray-900 text-xl font-medium mb-2">Applicant Name</h5>
                                <p className="text-gray-700 text-base mb-4">
                                    Applicant Skills/Description
                                </p>
                                <button type="button"
                                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    View Applicant Profile
                                </button>
                            </div>
                            <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                                Applied: 2 days ago
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex justify-center p-5">
                        <div className="block rounded-lg shadow-lg bg-white max-w-none text-center">
                            <div className="py-3 px-6 border-b border-gray-300">
                                Application 0003
                            </div>
                            <div className="p-6">
                                <h5 className="text-gray-900 text-xl font-medium mb-2">Applicant Name</h5>
                                <p className="text-gray-700 text-base mb-4">
                                    Applicant Skills/Description
                                </p>
                                <button type="button"
                                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    View Applicant Profile
                                </button>
                            </div>
                            <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                                Applied: 2 days ago
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex justify-center p-5">
                        <div className="block rounded-lg shadow-lg bg-white max-w-none text-center">
                            <div className="py-3 px-6 border-b border-gray-300">
                                Application 0004
                            </div>
                            <div className="p-6">
                                <h5 className="text-gray-900 text-xl font-medium mb-2">Applicant Name</h5>
                                <p className="text-gray-700 text-base mb-4">
                                    Applicant Skills/Description
                                </p>
                                <button type="button"
                                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    View Applicant Profile
                                </button>
                            </div>
                            <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                                Applied: 2 days ago
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
