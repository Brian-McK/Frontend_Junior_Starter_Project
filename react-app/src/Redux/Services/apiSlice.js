import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, selectCurrentUser } from "./authSlice";

// export const employeeSkillLevelsApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://localhost:7100/api/",
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;

//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   tagTypes: ["Employee", "SkillLevel", "User"],
//   endpoints: (builder) => ({
//     authenticateUser: builder.mutation({
//       query: (body) => ({
//         url: "auth",
//         method: "POST",
//         body,
//       }),
//     }),
//     getAllEmployees: builder.query({
//       query: () => ({
//         url: `employees`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
//                     `,
//         },
//       }),
//       providesTags: ["Employee"],
//     }),
//     getEmployeeById: builder.query({
//       query: (id) => `employees/${id}`,
//       providesTags: ["Employee"],
//     }),
//     addEmployee: builder.mutation({
//       query: (body) => ({
//         url: "employees",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
//                     `,
//         },
//         body,
//       }),
//       invalidatesTags: ["Employee"],
//     }),
//     editEmployee: builder.mutation({
//       query: (id, body) => ({
//         url: `employees/${id}`,
//         method: "PUT",
//         body,
//       }),
//       invalidatesTags: ["Employee"],
//     }),
//     deleteEmployee: builder.mutation({
//       query: (id) => ({
//         url: `employees/${id}`,
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
//                     `,
//         },
//       }),
//       invalidatesTags: ["Employee"],
//     }),
//     getAllSkillLevels: builder.query({
//       query: () => ({
//         url: `skillLevels`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg3NTM0NDA1fQ.Hni2sARh3lIF1ihS-2FAcCcwRiN-d3s-sJ4mrsJvMTE
//                     `,
//         },
//       }),
//       providesTags: ["SkillLevel"],
//     }),
//   }),
// });

const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7100/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // add to localStorage too?
    headers.append("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const user = api.getState().auth.user;

  console.log(user);

  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    // send the refresh token to get new access token

    const refreshResult = await baseQuery(
      {
        url: "Auth/refresh-token",
        method: "POST",
        body: JSON.stringify(user), // admintest
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

// inject endpoints here (code-splitting)
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});

// export const {
//   useAuthenticateUserMutation,
//   useGetAllEmployeesQuery,
//   useGetEmployeeByIdQuery,
//   useAddEmployeeMutation,
//   useEditEmployeeMutation,
//   useDeleteEmployeeMutation,
//   useGetAllSkillLevelsQuery,
// } = employeeSkillLevelsApi;
