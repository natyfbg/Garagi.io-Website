import { api } from "./rtkApi";

// type Post = {
//     id: string
//     title: string
//     description: string
//     category: JobArea
//     type: JobType
//     companyId: string
//     createdAt: Date
//     updatedAt: Date  
// };

// type JobApplication = {
//     studentId: string
//     postId: string
//     rejected: boolean
//     createdAt: Date
//     updatedAt: Date
// };

// type PostDetails = Post & Company

// type CreatePostDto = {
//   title: string;
//   description: string;
//   category: JobArea;
//   type: JobType;
//   skills: string[];
// };
export const JOB_TYPE_NAMES = {
    "FULL_TIME": "Full time",
    "PART_TIME": "Part time",
    "INTERNSHIP": "Internship",
    "APPRENTICESHIP": "Apprenticeship",
    "FREELANCE": "Freelance"
};

export const JOB_SALARY = {
    'NOT_SPECIFIED': 'Not specified',
    'S0_10': '0 - 10K',
    'S10_30' : '10K - 30K',
    'S30_50' : '30K - 50K',
    'S50_100' : '50K - 100K',
    'S100' : '100K & more',
}

export const JOB_AREA_NAMES = {
    AI_ML: 'Artificial intelligence',
    RPA: 'Robotic Process Automation',
    EC: 'Edge computing',
    QC: 'Quantum computing',
    VR_AR: 'Virtual / Augmented reality',
    BLOCKCHAIN: 'Blockchain',
    IOT: 'IoT',
    TELECOM_5G: '5G',
    CYBER_SECURITY: 'Cyber security'
};

const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Request: id: string
        // Response: PostDetails
        getJobPostDetails: builder.query({
            query: (id) => `/post/${id}`,
            providesTags: ['PostDetails'],
        }),
        // Request: id: string
        // Response: JobApplication
        applyJob: builder.mutation({
            query: (id) => ({
                method: 'POST',
                url: `/post/${id}/apply`,
            }),
            invalidatesTags: ['Application'],
        }),
        // Request: CreatePostDto
        // Response: JobPost
        createNewJob: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/post',
                body,
            }),
            invalidatesTags: ['Post', 'PostDetails'],
        }),
    }),
});

export const {
    useApplyJobMutation,
    useCreateNewJobMutation,
    useGetJobPostDetailsQuery,
} = postApi;