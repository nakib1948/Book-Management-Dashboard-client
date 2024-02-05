import baseApi from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sellbook: builder.mutation({
      query: (sellInfo) => ({
        url: "/sales/create-sellhistory",
        method: "POST",
        body: sellInfo,
      }),
    }),
    getSellHistory: builder.query({
      query: () => `/sales`,
    }),
  }),
});

export const { useSellbookMutation, useGetSellHistoryQuery } = salesApi;
