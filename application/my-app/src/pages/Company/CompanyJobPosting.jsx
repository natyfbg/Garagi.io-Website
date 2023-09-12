import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Select from 'react-select/creatable';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { JOB_AREA_NAMES, JOB_SALARY, JOB_TYPE_NAMES, useCreateNewJobMutation } from '../../services/posts';
import { JobArea, JobType } from '../../services/search';
import { useGetSkillsQuery } from '../../services/skill';
import { MAPS_API_KEY } from '../../utils/constants';
import FullscreenLoader from '../../components/FullscreenLoader';

export default function CompanyJobPosting() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const { data: skillsLoaded, isLoading: isLoadingOptions } = useGetSkillsQuery();
    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm();
    const [createNewJob, { isLoading }] = useCreateNewJobMutation();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: MAPS_API_KEY,
        libraries: ['places'],
    });
 
    const onSubmit = handleSubmit((data) => {
        const { skills, location, ...info } = data;
        const dto = {
            skills: skills?.map((s) => s.value) ?? [],
            location: location === '' ? undefined : location,
            ...info,
        }

        createNewJob(dto)
            .unwrap()
            .then((d) => {
                navigate(`/post/${d.id}`, { replace: true });
            })
            .catch((error) => console.log(error))

        
    });

    useEffect(() => {
        if (skillsLoaded) {
            setSkills(skillsLoaded.map((s) => ({ label: s.name, value: s.name })));
        }
    }, [skillsLoaded]);

    if (!isLoaded) {
        return <FullscreenLoader />
    }

    return (

        <div className="flex justify-center items-center w-full bg-sky-300">
            <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Company Job Posting</h1>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="first_name">Title</label>
                        <input {...register('title', { required: true, maxLength: 255 })} className="border py-2 px-3 text-grey-800" type="text"
                            placeholder="Please fill in the job title"></input>
                        { errors.title?.type === 'maxLength' && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                        { errors.title?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="Select">Type</label>
                        <select {...register('type', { required: true })} className="border py-2 px-3 text-grey-800">
                            {
                                Object.values(JobType).map((type) => (
                                    <option key={type} value={type}>{JOB_TYPE_NAMES[type]}</option>
                                ))
                            }
                         </select>
                        { errors.type?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="Select">Type</label>
                        <select {...register('category', { required: true })} className="border py-2 px-3 text-grey-800">
                            {
                                Object.values(JobArea).map((type) => (
                                    <option key={type} value={type}>{JOB_AREA_NAMES[type]}</option>
                                ))
                            }
                         </select>
                        { errors.category?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                    </div>


                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900">Salary</label>
                        <select {...register('salary', { required: true })} className="border py-2 px-3 text-grey-800">
                            {
                                Object.entries(JOB_SALARY).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))
                            }
                         </select>
                        { errors.salary?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="textarea">Qualifications</label>
                        <Controller
                            control={control}
                            name="skills"
                            render={({ field: { onChange, onBlur, ref }}) => (
                                <Select 
                                    defaultValue={[]}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    ref={ref}
                                    placeholder="Select the skills recommended for the job"
                                    isMulti
                                    isClearable
                                    options={skills}
                                    isLoading={isLoadingOptions}
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900">Location</label>
                        <Autocomplete>
                            <input {...register('location')} className="border py-2 px-3 text-grey-800" type="text"
                                placeholder="Please fill in the job work zone"></input>
                        </Autocomplete>
                    </div>
                    
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900">Description</label>
                        <textarea {...register('description', { required: true, maxLength: 1200 })} className="border py-3 px-3 text-grey-800 inline-block h-56"
                            placeholder="Please fill in the job detail"></textarea>
                        { errors.description?.type === 'required' && <p className="text-red-500 mt-2">Required</p> }
                        { errors.description?.type === 'maxLength' && <p className="text-red-500 mt-2">Max length: 255 characters</p> }
                    </div>
                    
                    <button 
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 
                            rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600"
                            type="submit"
                    >
                        {
                            isLoading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )
                        }

                        Create job post
                    </button>
                </form>
            </div>
        </div>
    );
};

