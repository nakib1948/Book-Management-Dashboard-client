import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => `/product`,
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
