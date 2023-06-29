import { apiSlice } from "./apiSlice";

export const skillLevelsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["SkillLevels"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllSkillLevels: builder.query({
        query: () => "/skilllevels",
        providesTags: ["SkillLevels"],
      }),
    }),
  });

export const { useGetAllSkillLevelsQuery } = skillLevelsApiSlice;
