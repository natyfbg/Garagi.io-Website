import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSignInAdminMutation } from '../../services/auth';
import { setToken } from '../../store/auth.slice';


export default function AdministrationLoginPage() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginAdmin, { isLoading }] = useSignInAdminMutation();

    const onSubmit = handleSubmit((data) => {
        loginAdmin(data)
            .unwrap()
            .then((payload) => {
                window.localStorage.setItem('token', payload.accessToken);
                dispatch(setToken(payload.accessToken));
                window.location.href = "/admin/dashboard";
            })
            .catch((error) => console.log(error));
    });

    return (
        <div className="w-full max-w-sm mx-auto mt-20 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 " >

            <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Garage.io</h2>

                <h3 className="mt-1 text-xl font-medium text-center text-red-500 ">Administration</h3>

                <p className="mt-1 text-xl font-medium text-center text-red-500 ">Login</p>

                <form onSubmit={onSubmit}>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-100 placeholder-gray-500 bg-white 
                        border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 
                        focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none 
                        focus:ring focus:ring-blue-300" 
                            type="text"
                            placeholder="Administration account"
                            aria-label="Administration account"
                            {...register('username', { required: true })}
                        />
                        { errors.username?.type === 'required' && <p className="text-red-500">Required</p>}
                    </div>

                    <div className="w-full mt-4">
                        <input 
                            className="block w-full px-4 py-2 mt-2 text-gray-100 placeholder-gray-500 bg-white border 
                                rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 
                                dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            {...register('password', { required: true, minLength: 8 })}
                        />
                        { errors.password?.type === 'required' && <p className="text-red-500">Required</p>}
                        { errors.password?.type === 'minLength' && <p className="text-red-500">Min 8 chars.</p>}
                    </div>

                    <div class="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            {
                                (isLoading) && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )
                            }

                            Login
                        </button>
                    </div>
                </form>
            </div>


        </div>

    );
}

