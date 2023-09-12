import { api } from "./rtkApi";

// Create User Dto
// export type CreateStudentDto = {
//     name: string;
//     firstname: string;
//     email: string;
//     password: string;
// };

// Create company Dto
// export type CreateCompanyDto = {
//     name: string;
//     email: string;
//     password: string;
// };

// export type JwtToken = {
//     accessToken: string;
// };

// export type StudentLoginDto = {
//     email: string;
//     password: string;
// }

// export type CompanyLoginDto = StudentLoginDto;

// export type AdminLoginDto = StudentLoginDto;


const authApi = api.injectEndpoints({
    // 
    endpoints: (builder) => ({
        // Body: CreateStudentDto
        // Response: JwtToken
        signUpStudent: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/auth/student/register',
                body,
                invalidatesTags: ['Student'],
            }),
        }),
        // Body: CreateCompanyDto
        // Response: JwtToken
        signUpCompany: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/auth/company/register',
                body,
            }),
            invalidatesTags: ['Company'],
        }),
        // Body: StudentLoginDto
        // Response: JwtToken
        signInStudent: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/auth/student/login',
                body,
            }),
            invalidatesTags: ['Student'],
        }),
        // Body: CompanyLoginDto
        // Response: JwtToken
        signInCompany: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/auth/company/login',
                body,
            }),
            invalidatesTags: ['Company'],
        }),
        // Body: AdminLoginDto
        // Response: JwtToken
        signInAdmin: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/auth/admin/login',
                body,
            }),
            invalidatesTags: ['Admin'],
        }),
    }),
});

export const {
    useSignInAdminMutation,
    useSignInCompanyMutation,
    useSignInStudentMutation,
    useSignUpCompanyMutation,
    useSignUpStudentMutation,
} = authApi;