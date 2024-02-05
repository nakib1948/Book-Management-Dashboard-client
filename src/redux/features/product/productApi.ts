import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (queryParam) => `/product?${queryParam}`,
    }),
    addbook: builder.mutation({
      query: (productInfo) => ({
        url: "/product/addbook",
        method: "POST",
        body: productInfo,
      }),
    }),
  }),
});

export const { useGetAllProductQuery,useAddbookMutation } = productApi;
