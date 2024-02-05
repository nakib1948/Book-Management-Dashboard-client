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
    updatebook: builder.mutation({
      query: ({data,id}) => ({
        url: `/product/updatebook/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletebook: builder.mutation({
      query: (data) => ({
        url: `/product/deletebook`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllProductQuery,useAddbookMutation,useUpdatebookMutation,useDeletebookMutation } = productApi;
