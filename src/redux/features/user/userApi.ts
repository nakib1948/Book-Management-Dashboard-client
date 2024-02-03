import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = userApi;
