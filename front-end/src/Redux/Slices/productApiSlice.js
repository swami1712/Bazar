import { apiSlice } from "../Slices/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/products",
        params: {
          keyword,
          pageNumber,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `product/${id}`,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `reviews/${data.productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} = productApiSlice;
