import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, selectCurrentUser } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7100/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");

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

  const user = localStorage.getItem("username");

  // if unauthorized is the status, send a request to get new access token
  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // send the refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: "Auth/refresh-token",
        method: "POST",
        body: JSON.stringify(user),
      },
      api,
      extraOptions
    );

    // if the refresh endpoint sends back response with the data, set the token to the local storage
    if (refreshResult?.data) {

      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      localStorage.setItem("token", refreshResult.data.jwtToken);
      localStorage.setItem("username", refreshResult.data.username);

      // try the query again
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("clear http only cookie & clear local storage, sign out");

      const logoutResult = await baseQuery(
        {
          url: "auth/logout",
          method: "POST",
        },
        api,
        extraOptions
      );

      if (logoutResult.meta.response.status === 204) {
        localStorage.clear();
        api.dispatch(logOut());
      }
    }
  }

  return result;
};

// inject endpoints here (code-splitting)
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
