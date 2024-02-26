import baseApi from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sellbook: builder.mutation({
      query: (sellInfo) => ({
        url: "/sales/create-sellhistory",
        method: "POST",
        body: sellInfo,
      }),
      invalidatesTags:['sales']
    }),
    getSellHistory: builder.query({
      query: (email) => `/sales/${email}`,
      providesTags:['sales']
    }),
  }),
});

export const { useSellbookMutation, useGetSellHistoryQuery } = salesApi;
