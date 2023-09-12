import { api } from "./rtkApi";

export const JobArea = {
    AI_ML: 'AI_ML',
    RPA: 'RPA',
    EC: 'EC',
    QC: 'QC',
    VR_AR: 'VR_AR',
    BLOCKCHAIN: 'BLOCKCHAIN',
    IOT: 'IOT',
    TELECOM_5G: 'TELECOM_5G',
    CYBER_SECURITY: 'CYBER_SECURITY'
}

export const JobType = {
    FULL_TIME: "FULL_TIME",
    PART_TIME: "PART_TIME",
    INTERNSHIP: "INTERNSHIP",
    FREELANCE: "FREELANCE"
}

// type JobPost = {
    // id: string
    // title: string
    // description: string
    // category: JobArea
    // type: JobType
    // companyId: string
    // createdAt: Date
    // updatedAt: Date
// };

// type Company = {
    // id: string
    // email: string
    // password: string
    // name: string
    // description: string | null
    // companyLogo: string | null
    // createdAt: Date
    // updatedAt: Date
// }

const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        searchJobs: builder.query({
            query: (params) => ({
                method: 'GET',
                url: '/search/jobs',
                params,
            }),
        }),
    }),
})

export const { useLazySearchJobsQuery } = searchApi;