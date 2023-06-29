import { apiSlice } from "./apiSlice";

export const employeesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Employees"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllEmployees: builder.query({
        query: () => "/employees",
        providesTags: ["Employees"],
      }),
      addEmployee: builder.mutation({
        query: (body) => ({
          url: `/employees`,
          method: "POST",
          body,
          responseHandler: "text",
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
  useDeleteEmployeeMutation,
  useAddEmployeeMutation,
} = employeesApiSlice;
