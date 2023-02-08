import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { Product, CartProduct } from 'typing';

type CartState = {
  products: CartProduct[];
};

const initialState: CartState = {
  products: [],
};

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      const product = state.products.find(({ id }) => id === payload.id);
      if (!product) {
        state.products = [...state.products, { ...payload, quantity: 1 }];
      } else {
        state.products = state.products.map((prod) =>
          prod.id === payload.id ? { ...prod, quantity: prod.quantity + 1 } : prod,
        );
      }
    },
    removeProduct: (state, { payload }: PayloadAction<number>) => {
      state.products = state.products.filter(({ id }) => id !== payload);
    },
  },
});

export const { addProduct, removeProduct } = actions;

export const selectProducts = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products,
);
export const selectQuantity = createSelector(
  ({ cart }: RootState, productId: number) => cart.products.find(({ id }) => id === productId),
  (product) => product?.quantity ?? 0,
);
export const selectSubTotal = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products.reduce((acc, { quantity }) => acc + quantity, 0),
);

export default reducer;
