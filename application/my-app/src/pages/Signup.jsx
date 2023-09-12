import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSignUpCompanyMutation, useSignUpStudentMutation } from '../services/auth';
import { setToken } from '../store/auth.slice';

export default function Signup() {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            type: 'student',
        },
    });
    const [signUpStudent, { isLoading: isLoadingStudent }] = useSignUpStudentMutation();
    const [signUpCompany, { isLoading: isLoadingCompany }] = useSignUpCompanyMutation();

    const type = watch('type');
    const password = watch('password');

    const onSubmit = handleSubmit((data) => {
        if (type === 'student') {
            const { confirmPassword, ...body } = data;
            signUpStudent(body)
                .unwrap()
                .then((payload) => {
                    window.localStorage.setItem('token', payload.accessToken);
                    dispatch(setToken(payload.accessToken));
                    window.location.href = "/student";            
                })
                .catch((error) => console.log(error));
            
            return;
        }

        if (type === 'company') {
            const { firstname, confirmPassword, ...body } = data;
            signUpCompany(body)
                .unwrap()
                .then((payload) => {
                    window.localStorage.setItem('token', payload.accessToken);
                    dispatch(setToken(payload.accessToken));
                    window.location.href = "/company";        
                })
                .catch((error) => console.log(error));

            return;
        }
    });

    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage: `url('https://images.unsplash.com/photo-1600727335606-1bb400010909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`}}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Sign Up for Garage.io
                        </h1>

                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                        </p>

                        <div className="mt-6">
                            <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button
                                    className={
                                        type !== 'company'
                                            ? "flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none hover:bg-blue-500 hover:text-white"
                                            : "flex justify-center w-full px-6 py-3 mt-4 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 focus:outline-none bg-blue-500 text-white"
                                    }
                                    onClick={() => setValue('type', 'company')}
                                >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <span className="mx-2">
                                        Employer
                                    </span>
                                </button>

                                <button 
                                    className={
                                        type !== 'student'
                                            ? "flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none hover:bg-blue-500 hover:text-white"
                                            : "flex justify-center w-full px-6 py-3 mt-4 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 focus:outline-none bg-blue-500 text-white"
                                    }
                                    onClick={() => setValue('type', 'student')}
                                    
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">
                                        Student
                                    </span>
                                </button>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={onSubmit}>
                            {
                                type === 'student' ? (
                                    <>
                                        <div>
                                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="John"
                                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                                {...register('firstname', { required: true })}
                                            />
                                            { errors.firstname?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last name</label>
                                            <input
                                                type="text"
                                                placeholder="Snow"
                                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                {...register('name', { required: true })}
                                            />
                                            { errors.name?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Company name</label>
                                        <input
                                            type="text"
                                            placeholder="Snow"
                                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            {...register('name', { required: true })}
                                        />
                                        { errors.name?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                                    </div>
                                ) 
                            }

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                <input
                                    type="email"
                                    placeholder="johnsnow@example.com"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    {...register('email', { required: true })}
                                />
                                { errors.email?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input 
                                    type="password"
                                    placeholder="Enter your password"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    {...register('password', { required: true, minLength: 8 })}
                                />
                                { errors.password?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                                { errors.password?.type === 'minLength' && <p className="text-red-500 mt-2">min 8 chars.</p> }
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    {...register('confirmPassword', { required: true, minLength: 8, validate: (v) => v === password })}
                                />
                                { errors.confirmPassword?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                                { errors.confirmPassword?.type === 'minLength' && <p className="text-red-500 mt-2">min 8 chars.</p> }
                                { errors.confirmPassword?.type === 'validate' && <p className="text-red-500 mt-2">Passwords different</p> }
                            </div>

                            <div className="self-end">
                                <button
                                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    {
                                        (isLoadingStudent || isLoadingCompany) && (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        )
                                    }

                                    <span>Sign Up </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}