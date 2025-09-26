import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.cart.find(item => item.name === action.payload.name);
      if (!existing) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
