import { api } from "./rtkApi";

// type Company = {
//     id: string
//     email: string
//     name: string
//     description: string | null
//     companyLogo: string | null
//     createdAt: Date
//     updatedAt: Date
// };

// type SetStateApplicationDto = {
//     studentId: string;
//     rejected: boolean;
// };

const companyApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Response: Company
        getLoggedInCompany: builder.query({
            query: () => '/company/me',
            providesTags: ['Company'],
        }),
        // Response: JobPost
        getLoggedInCompanyPosts: builder.query({
            query: () => '/company/me/posts',
            providesTags: ['Post'],
        }),
        getLoggedInCompanyApplications: builder.query({
            query: () => '/company/me/posts/applications',
            providesTags: ['Application'],
        }),
        updateCompany: builder.mutation({
            query: (body) => ({
                method: 'PATCH',
                url: '/company/me',
                body,
            }),
            invalidatesTags: ['Company'],
        }),
        // Params: id: string
        // Response: boolean
        removeCompanyPost: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/company/me/posts/${id}`,
            }),
            invalidatesTags: ['Post', 'PostDetails'],
        }),
        // Params: id: string
        // Response: JobApplication[]
        getPostApplications: builder.query({
            query: (id) => ({
                url: () => `/company/me/posts/${id}/applications`,
            }),
            providesTags: ['Application'],
        }),
        // Params: { id: string, ...body: SetStateApplicationDto }
        // Response: JobApplication
        setStateJobApplication: builder.mutation({
            query: ({ id, ...body }) => ({
                method: 'POST',
                url: `/company/me/jobs/${id}/applications`,
                body,
            }),
            invalidatesTags: ['Application'],
        }),
    }),
});

export const {
    useGetLoggedInCompanyQuery,
    useLazyGetLoggedInCompanyQuery,
    useGetLoggedInCompanyPostsQuery,
    useGetLoggedInCompanyApplicationsQuery,
    useUpdateCompanyMutation,
    useGetPostApplicationsQuery,
    useRemoveCompanyPostMutation,
    useSetStateJobApplicationMutation,
} = companyApi;