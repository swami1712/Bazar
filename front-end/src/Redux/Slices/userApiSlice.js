import { USER_URL } from "../../constants";
import { apiSlice } from "../Slices/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/signup",
        body: data,
        method: "POST",
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "/signin",
        body: data,
        method: "POST",
      }),
    }),
    signOut: builder.mutation({}),
    profile: builder.query({
      query: (userId) => `/profile/${userId}`,
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useProfileQuery } =
  userApiSlice;
