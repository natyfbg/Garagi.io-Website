
export default function Matching() {

    return (

        <div id="view" className="h-full w-screen flex flex-row" x-data="{ sidenav: true }">

            <div id="sidebar" className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden 
            transition-transform duration-300 ease-in-out" x-show="sidenav" >
                <div className="space-y-6 md:space-y-10 mt-10">
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">Garage.io</h1>
                    <div id="profile" className="space-y-3">

                        <div>
                            <h2 className="font-medium text-s md:text-s text-center text-teal-500">
                                Administrator Name
                            </h2>
                            <p className="text-s text-gray-500 text-center">Administrator</p>
                        </div>
                    </div>

                    <div id="menu" class="flex flex-col space-y-2">

                        {/* dashboard */}
                        <a href="/adminDashboard" className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500
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
                        <a href="" className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 
                                    hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
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





            <div className="px-6 pt-6 2xl:container">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Companies list */}
                    <div className="md:col-span-2 lg:col-span-1 overflow-auto" >
                        <h5 className="text-xl text-gray-600 text-center"></h5>

                        <div className="h-96 py-3 px-2 space-y-6 bg-white">




                        </div>
                    </div>



                    {/* user list */}

                    <div className="md:col-span-2 lg:col-span-1 overflow-auto">
                        <h5 className="text-xl text-gray-600 text-center">Users</h5>
                        <div className="h-96 py-2 px-3 space-y-6 bg-white">

                            <div>
                                <div className="mt-2 flex justify-center gap-4">
                                    <a href="" className="text-3xl font-bold text-gray-700">Jhon Wee</a>
                                    <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                        match!
                                    </button>
                                </div>
                                

                                <div className="flex justify-center items-end gap-1 text-green-500">
                                    <div>10</div>
                                    <span className="block text-center text-gray-500">'s job applications</span>
                                
                                </div>
                            </div>

                            <div>
                                <div className="mt-2 flex justify-center gap-4">
                                    <a href="" className="text-3xl font-bold text-gray-700">Long Lik</a>
                                    <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                        match!
                                    </button>
                                </div>

                                <div className="flex justify-center items-end gap-1 text-green-500">
                                    <div>10</div>
                                    <span className="block text-center text-gray-500">'s job applications</span>
                                    
                                </div>
                            </div>

                            <div>
                                <div className="mt-2 flex justify-center gap-4">
                                    <a href="" className="text-3xl font-bold text-gray-700">Jose Wee</a>
                                    <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                        match!
                                    </button>
                                </div>

                                <div className="flex justify-center items-end gap-1 text-green-500">
                                    <div>12</div>
                                    <span className="block text-center text-gray-500">'s job applications</span>
                                </div>
                            </div>

                            <div>
                                <div className="mt-2 flex justify-center gap-4">
                                    <a href="" className="text-3xl font-bold text-gray-700">Megu Lee</a>
                                    <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                        match!
                                    </button>
                                </div>

                                <div className="flex justify-center items-end gap-1 text-green-500">
                                    <div>10</div>
                                    <span className="block text-center text-gray-500">'s job applications</span>
                                </div>
                            </div>

                            <div>
                                <div className="mt-2 flex justify-center gap-4">
                                    <a href="" className="text-3xl font-bold text-gray-700">akua Mizuno</a>
                                    <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                        match!
                                    </button>
                                </div>

                                <div className="flex justify-center items-end gap-1 text-green-500">
                                    <div>9</div>
                                    <span className="block text-center text-gray-500">'s job applications</span>
                                </div>
                            </div>

                            <div>
                                <div className="mt-2 flex justify-center gap-4">
                                    <a href="" className="text-3xl font-bold text-gray-700">Mary Lu</a>
                                    <button className="px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                                        match!
                                    </button>
                                </div>

                                <div className="flex justify-center items-end gap-1 text-green-500">
                                    <div>8</div>
                                    <span className="block text-center text-gray-500">'s job applications</span>
                                </div>
                            </div>


                        </div>
                    </div>



                    {/* all jobs list */}

                    <div className="md:col-span-2 lg:col-span-1 overflow-auto">
                        <h5 className="text-xl text-gray-600 text-center"></h5>
                        <div className="h-96 py-3 px-2 text-gray-600 space-y-6 bg-white">





                        </div>
                    </div>

                </div>

            </div>



        </div>



    );
}