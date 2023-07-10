import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, selectCurrentUser } from "./authSlice";

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