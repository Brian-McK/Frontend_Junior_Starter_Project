import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7100/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");

    console.log("baseQuery", token);

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

    if (refreshResult?.data) {
      console.log(refreshResult);
      // store the new token
      localStorage.setItem("token", refreshResult.data.jwtToken);
      localStorage.setItem("username", refreshResult.data.username);

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
