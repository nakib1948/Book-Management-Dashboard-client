import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (queryParam) => `/product?${queryParam}`,
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
