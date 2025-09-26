import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // cart items will be stored here
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1; // if product already exists, increase quantity
      } else {
        state.items.push({ ...item, quantity: 1 }); // otherwise add new product
      }
    },
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((i) => i.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((i) => i.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
