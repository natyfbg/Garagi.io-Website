import { api } from "./rtkApi";

const skillApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => "/skills",
            providesTags: ['Skill'],
        }),
    }),
});

export const { useGetSkillsQuery } = skillApi;