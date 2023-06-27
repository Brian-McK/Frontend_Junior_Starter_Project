import { apiSlice } from "./apiSlice";

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "/employees",
    }),
    addEmployee: builder.mutation({
      query: (body) => ({
        url: `employees`,
        method: "POST",
        body,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useAddEmployeeMutation,
} = employeesApiSlice;
