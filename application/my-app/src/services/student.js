import { api } from "./rtkApi";

const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLoggedInStudent: builder.query({
            query: () => `/student/me`,
            providesTags: ['Student'],
        }),
        getStudentInformation: builder.query({
            query: (id) => `/student/${id}`,
            providesTags: ['Student'],
        }),
        updateLoggedInStudent: builder.mutation({
            query: (body) => ({
                method: 'PATCH',
                url: '/student/me/updateStudent',
                body,
            }),
            invalidatesTags: ['Student'],
        }),
        getLoggedInStudentApplications: builder.query({
            query: () => `/student/me/applications`,
            providesTags: ['Application'],
        }),
        getLoggedInStudentSkills: builder.query({
            query: () => `/student/me/skills`,
            providesTags: ['Skill'],
        }),
        removeLoggedInStudentApplication: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/student/me/applications/${id}`,
            }),
            invalidatesTags: ['Application'],
        }),
        addPostToFavourites: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/student/me/favourites',
                body,
            }),
            invalidatesTags: ['Favourites'],
        }),
        getFavouritesPosts: builder.query({
            query: () => '/student/me/favourites',
            providesTags: ['Favourites'],
        }),
        deletePostFromFavourites: builder.mutation({
            query: (body) => ({
                method: 'DELETE',
                url: '/student/me/favourites',
                body,
            }),
            invalidatesTags: ['Favourites'],
        }),
        updateSkills: builder.mutation({
            query: (body) => ({
                method: 'PATCH',
                url: '/student/me/skills',
                body,
            }),
            invalidatesTags: ['Skill'],
        }),
        uploadProfilePicture: builder.mutation({
            query: (formData) => ({
                method: 'PATCH',
                url: '/student/me/file/profilePicture',
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=--------------',
                },
                body: formData,
            }),
            invalidatesTags: ['Student'],
        }),
        uploadCV: builder.mutation({
            query: (formData) => ({
                method: 'PATCH',
                url: '/student/me/file/cv',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }),
            invalidatesTags: ['Student'],
        }),
        uploadCoverLetter: builder.mutation({
            query: (formData) => ({
                method: 'PATCH',
                url: '/student/me/file/coverLetter',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }),
            invalidatesTags: ['Student'],
        }),
    }),
});

export const {
    useGetLoggedInStudentQuery,
    useLazyGetLoggedInStudentQuery,
    useGetStudentInformationQuery,
    useGetLoggedInStudentApplicationsQuery,
    useGetLoggedInStudentSkillsQuery,
    useGetFavouritesPostsQuery,
    useAddPostToFavouritesMutation,
    useDeletePostFromFavouritesMutation,
    useUploadCVMutation,
    useUploadCoverLetterMutation,
    useUploadProfilePictureMutation,
    useUpdateLoggedInStudentMutation,
    useRemoveLoggedInStudentApplicationMutation,
    useUpdateSkillsMutation,
} = studentApi;