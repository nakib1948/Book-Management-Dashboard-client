import { createSlice } from "@reduxjs/toolkit";

export type bookFormat = "hardcover" | "paperback" | "e-book";

export type TBook = {
    name?: string;
    price?: number;
    quantity?: number;
    imageurl?: string;
    releaseDate?: string;
    author?: string;
    isbn?: string;
    genre?: string;
    publisher?: string;
    series?: string;
    language?: string;
    format?: bookFormat;
  };

const initialState: TBook[] = []

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const product = action.payload;
      state.push(product)
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
