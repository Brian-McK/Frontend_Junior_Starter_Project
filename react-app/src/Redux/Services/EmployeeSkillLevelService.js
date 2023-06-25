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
                    Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
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
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
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
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
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
                    Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
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