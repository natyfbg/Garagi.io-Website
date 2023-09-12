

export default function StudentUpdateInformation() {

    return (

        <div className="flex justify-center items-center w-full h-screen bg-sky-300">
            <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Update Profile</h1>
                <form action="/" method="post">
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="first_name">Name</label>
                        <input className="border py-2 px-3 text-grey-800" type="text" name="profile_name" id="profile_name"
                               placeholder="Change your name"></input>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="first_name">Email</label>
                        <input className="border py-2 px-3 text-grey-800" type="text" name="profile_email"
                               id="profile_email"
                               placeholder="Change your email"></input>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="last_name">New Password</label>
                        <input className="border py-2 px-3 text-grey-800" type="text" name="new-password" id="new-password"
                               placeholder="Please enter in a new password"></input>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="last_name">New Password Confirmation</label>
                        <input className="border py-2 px-3 text-grey-800" type="text" name="new-password-confirmation"
                               id="new-password-confirmation"
                               placeholder="Please confirm the new password"></input>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="last_name">Old Password</label>
                        <input className="border py-2 px-3 text-grey-800" type="text" name="old-password"
                               id="old-password"
                               placeholder="Please enter your old password"></input>
                    </div>

                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700
                            rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600" type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

