import baseApi from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getcartInformation: builder.query({
      query: (param) => `/cart/${param}`,
    }),
    addProductToCart: builder.mutation({
      query: (productInfo) => ({
        url: "/cart/addtocart",
        method: "POST",
        body: productInfo,
      }),
    }),
    quantityUpdate: builder.mutation({
        query: (data) => ({
          url: `/cart/quantityUpdate`,
          method: "PATCH",
          body: data,
        }),
      }),
  }),
});

export const {useAddProductToCartMutation,useGetcartInformationQuery,useQuantityUpdateMutation} = cartApi