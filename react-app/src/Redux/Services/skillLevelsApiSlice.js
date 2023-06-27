import { apiSlice } from "./apiSlice";

export const skillLevelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkillLevels: builder.query({
      query: () => "/skilllevels",
    }),
  }),
});

export const { useGetAllSkillLevelsQuery } = skillLevelsApiSlice;
