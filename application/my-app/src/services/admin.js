import { api } from "./rtkApi";

// type Admin = {
//     id: string;
//     username: string;
//     createdAt: Date;
//     updatedAt: Date; 
// };

const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Response: Admin
        getLoggedInAdmin: builder.query({
            query: () => '/admin/me',
            providesTags: ['Admin'],
        }),
        // Response: Student[]
        fetchStudents: builder.query({
            query: () => '/admin/students',
            providesTags: ['Student'],
        }),
        // Response: Company[]
        fetchCompanies: builder.query({
            query: () => '/admin/companies',
            providesTags: ['Company'],
        }),
        // Response: Post[]
        fetchPosts: builder.query({
            query: () => '/admin/posts',
            providesTags: ['Student'],
        }),
        // Response: boolean
        sendJobAlert: builder.mutation({
            query: () => ({
                url: (id) => ({
                    method: 'POST',
                    url: `/admin/${id}/alert`,
                }),
            }),
        }),
    }),
});

export const {
    useGetLoggedInAdminQuery,
    useFetchCompaniesQuery,
    useFetchPostsQuery,
    useFetchStudentsQuery,
    useSendJobAlertMutation,
} = adminApi;