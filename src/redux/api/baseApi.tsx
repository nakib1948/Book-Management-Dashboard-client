import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://book-management-dashboard-server.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes:['checkout','allbooks','sales'],
  endpoints: () => ({}),
});

export default baseApi;
