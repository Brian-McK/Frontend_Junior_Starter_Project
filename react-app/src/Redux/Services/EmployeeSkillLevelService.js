import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeSkillLevelsApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7100/api/",
    }),
    tagTypes: ["Employee", "SkillLevel", "User"],
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({
                url: `employees`,
                method: "GET",
                headers: {
                    Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbnRlc3QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY4NzUxMzgwNH0.6EGkoEFoWopdla9stDhLkmbgNtsG-kptkQfRxOzuCwU
                    `,
                },
            }),
            providesTags: ["Employee"],
        }),
        getEmployeeById: builder.query({
            query: (id) => `employees/${id}`,
            providesTags: ["Employee"],
        }),
        addEmployee: builder.mutation({
            query: (body) => ({
                url: "employees",
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbnRlc3QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY4NzUxMzgwNH0.6EGkoEFoWopdla9stDhLkmbgNtsG-kptkQfRxOzuCwU
                    `,
                },
                body,
            }),
            invalidatesTags: ["Employee"],
        }),
        editEmployee: builder.mutation({
            query: (id, body) => ({
                url: `employees/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Employee"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `employees/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbnRlc3QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY4NzUxMzgwNH0.6EGkoEFoWopdla9stDhLkmbgNtsG-kptkQfRxOzuCwU
                    `,
                },
            }),
            invalidatesTags: ["Employee"],
        }),
        getAllSkillLevels: builder.query({
            query: () => ({
                url: `skillLevels`,
                method: "GET",
                headers: {
                    Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbnRlc3QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY4NzUxMzgwNH0.6EGkoEFoWopdla9stDhLkmbgNtsG-kptkQfRxOzuCwU
                    `,
                },
            }),
            providesTags: ["SkillLevel"],
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetAllSkillLevelsQuery
} = employeeSkillLevelsApi;