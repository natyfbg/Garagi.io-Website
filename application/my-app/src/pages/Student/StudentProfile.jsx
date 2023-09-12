import { useState } from 'react';
import { createRef } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import Select from 'react-select/creatable';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Controller, useForm } from 'react-hook-form';
import { useGetLoggedInStudentApplicationsQuery, useGetLoggedInStudentSkillsQuery, useLazyGetLoggedInStudentQuery, useUpdateLoggedInStudentMutation, useUpdateSkillsMutation } from '../../services/student';
import { useGetSkillsQuery } from '../../services/skill';
import FullscreenLoader from '../../components/FullscreenLoader';
import { API_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth.slice';
import { useEffect } from 'react';
import NavBar from '../../components/Nav';

dayjs.extend(relativeTime);

const EditProfileForm = ({ onClose, imageHash, student, onChangePicture }) => {
    const ref = createRef();
    const { token } = useSelector((state) => state.auth);
    const { data: mySkillsLoaded } = useGetLoggedInStudentSkillsQuery();
    const { data: skillsLoaded, isLoading: isLoadingOptions } = useGetSkillsQuery();
    const [skills, setSkills] = useState([]);
    const [udpateStudentProfile] = useUpdateLoggedInStudentMutation();
    const [udpateSkills] = useUpdateSkillsMutation();
    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm({
        defaultValues: {
            github: student.github,
            twitter: student.twitter,
            ig: student.ig,
            bio: student.bio,
            jobAlert: student.jobAlert,
            jobAlertTrigger: student.jobAlertTrigger,
        }
    });

    const jobAlert = watch('jobAlert');

    const onSubmit = handleSubmit((data) => {
        const dto = {
            github: data.github?.length > 0 ? data.github : undefined,
            twitter: data.twitter?.length > 0 ? data.twitter : undefined,
            ig: data.ig?.length > 0 ? data.ig : undefined,
            bio: data.bio?.length > 0 ? data.bio : undefined,
            jobAlert: data.jobAlert ?? undefined,
            jobAlertTrigger: !data.jobAlert ? undefined : (data.jobAlertTrigger ?? undefined),
        }

        const skills = data.skills?.map(s => s.value.toUpperCase().trim());

        if(data.cv.length > 0) {
            const formData = new FormData();
            formData.append('uploadedFile', data.cv[0]);
    
            axios.patch(`${API_URL}/student/me/file/cv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }).then(() => console.log("CV uploaded"))
    
        }

        if (data.coverLetter.length > 0) {
            const formData = new FormData();
            formData.append('uploadedFile', data.coverLetter[0]);
    
            axios.patch(`${API_URL}/student/me/file/coverLetter`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }).then(() => console.log("Cover letter uploaded"))   
        }

        if (skills) {
            udpateSkills({ skills })
                .unwrap()
                .then(() => console.log("Skills updated"))
        }

        udpateStudentProfile(dto)
            .unwrap()
            .then(() => onClose())
            .catch((e) => console.log(e))

    })

    useEffect(() => {
        if (mySkillsLoaded) {
            // setSkills(mySkillsLoaded.map((s) => ({ label: s.name, value: s.name })));
            setValue('skills', mySkillsLoaded.map((s) => ({ label: s.name, value: s.name })));
        }
    }, [mySkillsLoaded, setValue]);

    useEffect(() => {
        if (skillsLoaded) {
            setSkills(skillsLoaded.map((s) => ({ label: s.name, value: s.name })));
        }
    }, [skillsLoaded]);

    
    return (
        <>
            <div className="flex justify-center cursor-pointer" onClick={() => ref.current?.click()}>
                <input type="file" ref={ref} className="hidden" accept=".png,.jpg,.jpeg" onChange={(e) => onChangePicture(e.target.files[0])} />
                <img 
                    src={`${API_URL}/student/${student.id}/profile_picture?${imageHash}`} 
                    alt="" 
                    className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
            </div>

            <div className="mt-16">
                <h1 className="font-bold text-center text-3xl text-gray-900">{student.firstname} {student.name}</h1>
                <p>
                    <span>
                        
                    </span>
                </p>

                <div className="w-full">
                    <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                        <form className="w-full px-4 py-3" onSubmit={onSubmit}>
                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Biography</label>
                                <textarea
                                    type="text"
                                    placeholder="John"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    {...register('bio', { maxLength: 255 })}
                                />
                                { errors.bio && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                            </div>
                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Skills</label>
                                <Controller
                                    control={control}
                                    name="skills"
                                    render={({ field: { onChange, onBlur, ref }}) => (
                                        <Select 
                                            defaultValue={[]}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            ref={ref}
                                            isMulti
                                            isClearable
                                            options={skills}
                                            isLoading={isLoadingOptions}
                                        />
                                    )}
                                />
                            </div>
                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black" htmlFor="cv">CV (Accepted: *.pdf)</label>
                                <input
                                    type="file"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    accept=".pdf"
                                    {...register('cv')}
                                />
                            </div>
                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Cover letter (Accepted: *.pdf)</label>
                                <input
                                    type="file"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    accept=".pdf"
                                    {...register('coverLetter')}
                                />
                            </div>

                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Github</label>
                                <input
                                    type="text"
                                    placeholder="Github username"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    {...register('github', { maxLength: 255 })}
                                />
                                { errors.github && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                            </div>


                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Twitter</label>
                                <input
                                    type="text"
                                    placeholder="Twitter username"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    {...register('twitter', { maxLength: 255 })}
                                />
                                { errors.twitter && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                            </div>


                            <div className="py-3">   
                                <label className="block mb-2 text-sm text-black">Instagram</label>
                                <input
                                    type="text"
                                    placeholder="Instagram username"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    {...register('instagram', { maxLength: 255 })}
                                />
                                { errors.instagram && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                            </div>

                            <div className="flex justify-left py-3">
                                <div className="form-check form-switch">
                                    <input  {...register('jobAlert')} className="mr-2" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexSwitchCheckDefault">Enable job alerts notifications</label>
                                </div>
                            </div>

                            {
                                jobAlert && (
                                    <div className="py-3">   
                                        <label className="block mb-2 text-sm text-black">Trigger keywords for job alerts</label>
                                        <input
                                            type="text"
                                            placeholder="Trigger keywords"
                                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                            {...register('jobAlertTrigger')}
                                        />
                                    </div>
                                )
                            }

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
};

export default function StudentProfile() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [fetchStudent, { data: student, isLoading: isLoadingStudent, isUninitialized }] = useLazyGetLoggedInStudentQuery();
    const { data: applications, isLoading: isLoadingApplications  } = useGetLoggedInStudentApplicationsQuery();
    const [imageHash, setImageHash] = useState(Date.now());
    
    const onChangePicture = (file) => {
        const formData = new FormData();
        formData.append('uploadedFile', file);

        axios.patch(`${API_URL}/student/me/file/profilePicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        }).then((response) => {
            fetchStudent();
            setImageHash(Date.now());
        })
    }

    useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);

    if (((!isLoadingStudent && isUninitialized) || isLoadingStudent) && !student) {
        return <FullscreenLoader />;
    }

    return(
        <div className="container mx-auto my-60">
        <div>

            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
                {
                    editing ? (
                        <EditProfileForm imageHash={imageHash} student={student} onChangePicture={onChangePicture} onClose={() => setEditing(false)} />
                    ) : (
                        <>
                            <div className="flex justify-center">
                                <img src={`${API_URL}/student/${student.id}/profile_picture`} alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                            </div>

                            <div className="mt-16">
                                <h1 className="font-bold text-center text-3xl text-gray-900">{student.firstname} {student.name}</h1>
                                <p>
                                    <span>
                                        
                                    </span>
                                </p>
                                <div className="my-5 px-6">
                                    <a href="#" className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-sky-600 hover:bg-sky-900 hover:text-white" onClick={() => setEditing(true)}>
                                        Edit your profile
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
                                <p className="pt-4 px-4 text-justify">
                                    {student.bio}
                                </p>

                                <div className="flex justify-between items-center my-5 px-6">
                                    {
                                        student.github && <a href={`https://github.com/${student.github}`} target="_blank" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3" rel="noreferrer">Github</a>
                                    }
                                    {
                                        student.twitter && <a href={`https://twitter.com/${student.twitter}`} target="_blank" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3" rel="noreferrer">Twitter</a>
                                    }
                                    {
                                        student.ig && <a href={`https://instagram.com/${student.ig}`} target="_blank" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3" rel="noreferrer">Instagram</a>
                                    }
                                    <a href={`mailto:${student.email}`} className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>
                                </div>

                                <div className="w-full">
                                    <h3 className="font-medium text-gray-900 text-left px-6">Recent applications</h3>
                                    <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                        {
                                            isLoadingApplications ? (
                                                <svg className="animate-spin h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                applications?.map((a) => (
                                                    <a href={`/post/${a.postId}`} className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                                        <img src={`${API_URL}/company/${a.post.companyId}/logo`} alt="" className="rounded-full h-6 shadow-md inline-block mr-2"/>
                                                            You applied for the job entitled <span className="font-medium">{a.post.title}</span>
                                                            <span className="text-gray-500 text-xs pl-1">{dayjs(a.createdAt).fromNow()} </span>
                                                    </a>
                                                ))
                                            )
                                        }
                                    </div>
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