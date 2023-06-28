import { apiSlice } from "./apiSlice";

// extended slice
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
