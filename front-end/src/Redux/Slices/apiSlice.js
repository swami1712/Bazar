import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

const getToken = () => {
  const data = JSON.parse(localStorage.getItem("token"));
  const token = data?.token;
  return token ? token : "";
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("token", token);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
