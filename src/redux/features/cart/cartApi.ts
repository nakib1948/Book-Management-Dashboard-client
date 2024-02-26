import baseApi from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getcartInformation: builder.query({
      query: (param) => `/cart/${param}`,
      providesTags:['checkout']
    }),
    addProductToCart: builder.mutation({
      query: (productInfo) => ({
        url: "/cart/addtocart",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags:['checkout']
    }),
    quantityUpdate: builder.mutation({
      query: (data) => ({
        url: `/cart/quantityUpdate`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:['allbooks']
    }),
    deletefromCart: builder.mutation({
      query: (data) => ({
        url: `/cart/removefromcart`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags:['allbooks']
    }),
  }),
});

export const {
  useAddProductToCartMutation,
  useGetcartInformationQuery,
  useQuantityUpdateMutation,
  useDeletefromCartMutation
} = cartApi;
