import axios from 'axios';
import dayjs from 'dayjs';
import { createRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenLoader from '../../components/FullscreenLoader';
import { useGetLoggedInCompanyApplicationsQuery, useGetLoggedInCompanyPostsQuery, useLazyGetLoggedInCompanyQuery, useUpdateCompanyMutation } from '../../services/company';
import { useGetStudentInformationQuery } from '../../services/student';
import { logout } from '../../store/auth.slice';
import { API_URL } from '../../utils/constants';

const CompanyEditingForm = ({ company, onChangePicture, imageHash, onClose }) => {
    const ref = createRef();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            description: company.description,
        },
    });
    const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

    const onSubmit = handleSubmit((data) => {
        updateCompany(data)
            .unwrap()
            .then(() => {
                onClose();
            })
            .catch((error) => console.log(error))
    });

    return (
        <>
            <div className="flex justify-center cursor-pointer" onClick={() => ref.current?.click()}>
                <input type="file" ref={ref} className="hidden" accept=".png,.jpg,.jpeg" onChange={(e) => onChangePicture(e.target.files[0])} />
                <img 
                    src={`${API_URL}/company/${company.id}/logo?${imageHash}`} 
                    alt="" 
                    className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
            </div>

            <div className="mt-16">
                <h1 className="font-bold text-center text-3xl text-gray-900">{company.name}</h1>
                <p>
                    <span>
                        
                    </span>
                </p>

                <div className="w-full">
                    <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                        <form className="w-full px-4 py-3" onSubmit={onSubmit}>
                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Description</label>
                                <textarea
                                    type="text"
                                    placeholder="John"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    {...register('description', { maxLength: 255 })}
                                />
                                { errors.bio && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                            </div>

                            <div className="flex">
                                <button
                                    className="mr-2 items-center w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    onClick={() => onClose()}
                                >
                                    <p>Cancel</p>
                                </button>
                                <button
                                    type="submit"
                                    className="items-center w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                >
                                    <p>Save your information</p>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

const ApplicationViewer = ({ application, posts }) => {
    // Get student information;
    // Get Post Inforamtion;
    const { data: student } = useGetStudentInformationQuery(application.studentId);
    const post = posts.find((p) => p.id === application.postId);

    useEffect(() => {
        if (student) {
            console.log(student);
        }
    }, [student]);

    if (!post || !student) {
        return <></>
    }

    return (
        <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
            <img src={`${API_URL}/student/${application.studentId}/profile_picture`} alt="" className="rounded-full h-6 shadow-md inline-block mr-2"/>
            You received an application for the job post entitled <span className="font-medium">{post.title}</span>{' '}
            by <span className="font-medium">{student.firstname} {student.name}</span>{' '}
            {
                (student.cv || student.coverLetter) && (
                    <>
                        - Files: { student.cv && <a href={`${API_URL}/student/${student.id}/cv`}>CV</a> }{' - '}
                        { student.coverLetter && <a href={`${API_URL}/student/${student.id}/coverLetter`}>Cover letter</a> }
                    </>                    
                )
            }
            <span className="text-gray-500 text-xs pl-1">{dayjs(application.createdAt).fromNow()} </span>
        </a>
    );
};

export default function CompanyProfile() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [editing, setEditing] = useState(false);
    const [section, setSection] = useState('activities');
    const [imageHash, setImageHash] = useState(Date.now());
    const [fetchCompany, { data: company, isLoading: isLoadingCompany, isUninitialized }] = useLazyGetLoggedInCompanyQuery();
    const { data: posts, isLoading: isLoadingPosts } = useGetLoggedInCompanyPostsQuery();
    const { data: applications, isLoading: isLoadingApplications } = useGetLoggedInCompanyApplicationsQuery();

    const onChangePicture = (file) => {
        const formData = new FormData();
        formData.append('uploadedFile', file);

        axios.patch(`${API_URL}/company/me/file/logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        }).then((response) => {
            fetchCompany();
            setImageHash(Date.now());
        })
    }

    useEffect(() => {
        if (fetchCompany) {
            fetchCompany();
        }
    }, [fetchCompany]);

    if (((!isLoadingCompany && isUninitialized) || isLoadingCompany) && !company) {
        return <FullscreenLoader />;
    }
    
    return(
        <div class="container mx-auto my-60">
        <div>
            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">

                {
                    editing ? (
                        <CompanyEditingForm
                            company={company}
                            imageHash={imageHash}
                            onChangePicture={onChangePicture}
                            onClose={() => setEditing(false)}
                        />
                    ) : (
                        <>
                            <div class="flex justify-center">
                                <img src={`${API_URL}/company/${company.id}/logo`} alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                            </div>
                            
                            <div class="mt-16">
                                <h1 class="font-bold text-center text-3xl text-gray-900">{company.name}</h1>
                                <div className="text-center mb-2 text-blueGray-600 mt-4">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    {company.description}
                                </div>

                                <p>
                                    <span>
                                        
                                    </span>
                                </p>
                                <div class="my-5 px-6">
                                    <a 
                                        href="#"
                                        class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-sky-600 hover:bg-sky-900 hover:text-white"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit your profile
                                    </a>
                                </div>

                                <div class="my-5 px-6">
                                    <a href="/company/posts/create" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-sky-600 hover:bg-sky-900 hover:text-white">
                                        Post a job offer
                                    </a>
                                    <div className="pt-3 text-center">
                                        <a className="text-blue-400 font-medium leading-6 hover:text-blue-200 cursor-pointer" onClick={() => {
                                            dispatch(logout());
                                            window.location.href = "/";
                                        }}>
                                            Log out
                                        </a>
                                    </div>

                                </div>

                                <div className="flex justify-between items-center my-5 px-6">
                                    <a onClick={() => setSection('activities')} className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Recent activities</a>
                                    <a onClick={() => setSection('applications')} className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Job applications</a>
                                </div>



                                <div class="w-full">
                                    {
                                        section === 'activities' && (
                                            <>
                                                <h3 class="font-medium text-gray-900 text-left px-6">Recent activities</h3>
                                                <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                                    {
                                                        isLoadingPosts ? (
                                                            <svg className="animate-spin h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            posts?.map((a) => (
                                                                <a href={`/post/${a.id}`} className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                                                    You created a job post entitled <span className="font-medium">{a.title}</span>
                                                                    <span className="text-gray-500 text-xs pl-1">{dayjs(a.createdAt).fromNow()} </span>
                                                                </a>
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        section === 'applications' && (
                                            <>
                                                <h3 class="font-medium text-gray-900 text-left px-6">Recent applications</h3>
                                                <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                                    {
                                                        isLoadingApplications ? (
                                                            <svg className="animate-spin h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            applications?.map((a) => (
                                                                <ApplicationViewer application={a} posts={posts} />
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </div>
    )
}