import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../utils/constants';

export const api = createApi({
    reducerPath: 'rtkApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['Student', 'Company', 'Admin', 'Post', 'PostDetails', 'Application', 'Skill', 'Favourites'],
});