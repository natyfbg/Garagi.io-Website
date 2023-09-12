import { useState } from "react";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { JobType, JobArea, useLazySearchJobsQuery } from "../services/search";
import { useForm } from 'react-hook-form';
import { JOB_AREA_NAMES } from "../services/posts";
//categories
// import { JobArea, useLazySearchJobsQuery } from "../services/search";

const SearchJobResults = ({ results }) => {
	const navigate = useNavigate();

	if (!results || results.length === 0) {
		return (
			<p>No job posts found</p>
		);
	}

	return (
		results.map((post) => (
			<div className="flex w-full p-8 border-b border-gray-300 cursor-pointer hover:bg-gray-100" onClick={() => navigate(`/post/${post.id}`)}>
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
	// categories
	const jobArea = watch('jobArea');

	const [searchJobs, { isLoading }] = useLazySearchJobsQuery();

	useEffect(() => {
		searchJobs({
			types: !jobTypes ? undefined : jobTypes.join('|'),
			categories: !jobArea ? undefined : jobArea.join('|'),
			
		})
			.unwrap()
			.then((data) => setResults(data))
			.catch((error) => console.log(error))
	}, [jobTypes, jobArea]); // add jobArea here



	const onSubmit = handleSubmit((payload) => {
		searchJobs({
			types: !payload.jobTypes ? undefined : payload.jobTypes.join('|'),
			categories: !payload.jobArea ? undefined : payload.jobArea.join('|'),
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
						<div className="box-border border-4 rounded-xl">
							{
								Object.values(JobType).map((type) => (
									<label className="flex items-center items-start mb-4">
										<input {...register('jobTypes')} value={type} type="checkbox" className=" w-6 h-6 rounded-full" /><span className="px-5 py-2 mt-2 text-lg font-medium rounded-xl hover:bg-gray-300">{type}</span>
									</label>

								))
							}
						</div>
						
						{/* 9 job area  */}
						<div className="flex flex-col mb-1">
							<label className="mb-1 font-bold text-lg text-gray-900" for="Select">Job Area</label>
							
							{
								Object.values(JobArea).map((type) => (
									<label className="flex items-center items-start">
										<input {...register('jobArea')} value={type} type="checkbox" className=" w-6 h-6 rounded-full" /><span className="px-2 py-2 text-lg font-medium rounded-xl hover:bg-gray-300">{JOB_AREA_NAMES[type]}</span>
									</label>

								))
							}
						
						</div>

					</div>




					<div className="flex flex-col flex-grow w-3/4 border-l border-r border-gray-300">
						<div className="flex flex-row flex-shrink-0 w-3/4 py-4 pl-4">
							<input {...register('q')} className="flex flex-1 items-center h-8 px-2 border border-gray-500 rounded-sm" type="search" placeholder="Search…" />
							<button type="submit" className="px-4 py-2 text-gray-800 bg-sky-400 rounded-md shadow hover:bg-sky-300">Search</button>
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
					{/* <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
						<div className="box-border border-4 bg-blue-300 rounded-xl text-center">
							<div className="font-mono text-xl italic font-bold ">Want Access<br></br> To More <br></br> features?</div>
							<div className="font-mono "><br></br>click the button below to Register</div>
							<div><br></br></div>
							<a href="/signup" className=" box-border border-2 bg-withe-400  text-black rounded-l hover:bg-red-300">Register to find job</a>
						</div>
					</div> */}
				</div>
			</div>
		</form>
	);
}
