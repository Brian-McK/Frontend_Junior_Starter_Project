import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeSkillLevelsApi = createApi({
    reducerPath: "employeeSkillLevelsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:40443/",
    }),
    tagTypes: ["Employees"],
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => `employees`,
            providesTags: ["Employees"],
        }),
        getEmployeeById: builder.query({
            query: (id) => `employees/${id}`,
            providesTags: ["Employees"],
        }),
        addEmployee: builder.mutation({
            query: (body) => ({
                url: "employees",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Employees"],
        }),
        editEmployee: builder.mutation({
            query: (id) => ({
                url: `employees/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Employees"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `employees/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Employees"],
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation
} = employeeSkillLevelsApi;