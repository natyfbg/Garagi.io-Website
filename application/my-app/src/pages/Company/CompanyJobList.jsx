import { useState } from "react";
import { JobType, useLazySearchJobsQuery } from "../../services/search";
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useEffect } from "react";

const SearchJobResults = ({ results }) => {

    if (!results || results.length === 0) {
        return (
            <p>No job posts found</p>
        );
    }

    return (
        results.map((post) => (
            <div className="flex w-full p-8 border-b border-gray-300">
                <div className="flex flex-col flex-grow ml-4">
                    <div className="flex">
                        <span className="font-semibold">{post.title}</span>
                        <span className="ml-1">{post.company.name}</span>
                    </div>
                    <div>
                        <p>{post.type}</p>
                    </div>

                    <div>
                        <p>{post.description}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Submitted the {dayjs(post.createdAt).format('YYYY-MM-DD')}</p>
                    </div>
                </div>
            </div>
        ))
    );
};

export default function Homepage() {
    const [results, setResults] = useState();
    const { register, handleSubmit, watch } = useForm();
    const jobTypes = watch('jobTypes');

    const [searchJobs, { isLoading }] = useLazySearchJobsQuery();

    useEffect(() => {
        searchJobs({
            types: !jobTypes ? undefined : jobTypes.join('|'),
        })
            .unwrap()
            .then((data) => setResults(data))
            .catch((error) => console.log(error))
    }, [jobTypes]);

    const onSubmit = handleSubmit((payload) => {
        searchJobs({
            types: !payload.jobTypes ? undefined : payload.jobTypes.join('|'),
            q: !payload.q ? undefined : payload.q,
        })
            .unwrap()
            .then((data) => setResults(data))
            .catch((error) => console.log(error))
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
                <div className="flex w-full max-w-screen-lg">
                    <div className="flex flex-col w-64 py-4 pr-3">
                        <div className="box-border border-4 rounded-md p-3 border-sky-300">
                            {
                                Object.values(JobType).map((type) => (
                                    <label className="flex items-center items-start mb-4">
                                        <input {...register('jobTypes')} value={type} type="checkbox" className=" w-6 h-6 rounded-full" /><span className="px-5 py-2 mt-2 text-lg font-small rounded-xl hover:bg-gray-300">{type}</span>
                                    </label>

                                ))
                            }
                        </div>
                    </div>




                    <div className="flex flex-col flex-grow w-3/4 border-l border-r border-gray-300">
                        <div className="flex flex-row flex-shrink-0 w-3/4 py-4 pl-4">
                            <input {...register('q')} className="flex flex-1 items-center h-8 px-2 border border-gray-500 rounded-sm p-5" type="search" placeholder="Search…" />
                            <button type="submit" className="px-4 py-2 text-white bg-sky-500 rounded-md shadow hover:bg-sky-300">Search</button>
                        </div>

                        <div className="flex-grow h-0 overflow-auto">

                            {
                                isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                                ) : (
                                    <SearchJobResults results={results} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
