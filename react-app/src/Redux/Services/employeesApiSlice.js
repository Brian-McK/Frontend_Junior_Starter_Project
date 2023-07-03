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
      editEmployee: builder.mutation({
        query: ({ id, body }) => ({
          url: `/employees/${id}`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Employees"],
      }),
      deleteEmployee: builder.mutation({
        query: (id) => ({
          url: `employees/${id}`,
          method: "DELETE",
          responseHandler: "text",
        }),
        invalidatesTags: ["Employees"],
      }),
    }),
  });

export const {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
} = employeesApiSlice;
