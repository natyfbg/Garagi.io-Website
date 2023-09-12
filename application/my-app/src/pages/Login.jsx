import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSignInStudentMutation, useSignInCompanyMutation } from '../services/auth';
import { setToken } from '../store/auth.slice';

export default function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginStudent, { isLoading: isLoadingStudent }] = useSignInStudentMutation();
  const [loginCompany, { isLoading: isLoadingCompany }] = useSignInCompanyMutation();


  const onSubmit = handleSubmit((data) => {
    loginStudent(data)
      .unwrap()
      .then((payload) => {
        window.localStorage.setItem('token', payload.accessToken);
        dispatch(setToken(payload.accessToken));
        window.location.href = "/student";
      }) // Store token + redirection
      .catch((err) => {
        loginCompany(data)
          .unwrap()
          .then((payload) => {
            window.localStorage.setItem('token', payload.accessToken);
            dispatch(setToken(payload.accessToken));
            window.location.href = "/company";    
          }) // Store token + redirection
          .catch((err) => console.log(err));
      })
  });

  return(
    <div className="h-100 bg-gradient-to-r from-cyan-500 to-blue-500">

    <div className="h-screen flex">
          <div className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
            <div 
                  className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
                  >

                  </div>
            <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
              <h1 className="text-white font-bold text-4xl font-sans">Garage.io</h1>
              <p className="text-white mt-1">All the best ideas started from a garage, find your next big garage start up here.</p>
              <div className="flex justify-center lg:justify-start mt-6">
                  <a href="/signup" className="hover:bg-sky-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-sky-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Sign up</a>
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={onSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome Back!</h1>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input 
                    id="email"
                    className="pl-2 w-full outline-none border-none"
                    type="email"
                    placeholder="Email Address"
                    {...register('email', { required: true })}
                  />
                  { errors.email?.type === 'required' && <p className="text-red-500">Required</p>}
                </div>
                <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input
                    className="pl-2 w-full outline-none border-none"
                    type="password" 
                    id="password"
                    placeholder="Password"
                    {...register('password', { required: true, minLength: 8 })}  
                  />
                  { errors.password?.type === 'required' && <p className="text-red-500">Required</p>}
                  { errors.password?.type === 'minLength' && <p className="text-red-500">Min 8 chars.</p>}                  
                </div>
                
                <button type="submit" class="block w-full bg-sky-500 mt-5 py-2 rounded-2xl hover:bg-sky-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                  {
                    (isLoadingStudent || isLoadingCompany) && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )
                  }
                  Login
                </button>
                
                <div className="flex justify-between mt-4">
                  <a href="/signup" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</a>
                </div>
              </form>
            </div>
            
          </div>
      </div>
      </div>
  )
}

