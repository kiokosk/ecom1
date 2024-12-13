// 'use client';

// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export interface CartItem {
//     id:number;
//     title:string;
//     price:number;
//     category:string;
//     image:string;
//     rating:{
//         rate:number;
//         count:number;
//     },
//     quantity:number;
// }

// interface CartState {
//     items: CartItem[];
// }

// const initialState:CartState = {
//     items: [],
// }

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         loadItems: (state, action:PayloadAction<CartItem[]>) => {
//             state.items = action.payload;
//         },
//         addItem: (state, action:PayloadAction<Omit<CartItem, "quantity">>) => {
//             const existingItem = state.items.find((item) => item.id === action.payload.id);
//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 state.items.push({ ...action.payload, quantity: 1 });
//             }
//         },

//         removeItem: (state, action:PayloadAction<{id:number}>) => {
//             const existingItem = state.items.find((item) => item.id === action.payload.id);
//             if (existingItem) {
//                 if (existingItem.quantity > 1) {
//                     existingItem.quantity -= 1;
//                 } else {
//                     state.items = state.items.filter((item) => item.id !== action.payload.id);
//                 }          
//             }
//         },

//         clearCart: (state) => {
//             state.items = [];
//             // if (window !== undefined) {
//             //     localStorage.setItem('items', JSON.stringify(state.items));
//             // }        
//         },
//     },
// })

// export const { addItem, removeItem, clearCart, loadItems } = cartSlice.actions;
// export default cartSlice.reducer;


'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    // Updated addItem reducer
    addItem: (
      state,
      action: PayloadAction<CartItem> // Include quantity in the payload
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity; // Add the new quantity
      } else {
        state.items.push(action.payload); // Push the item with the initial quantity
      }
    },

    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart, loadItems } = cartSlice.actions;
export default cartSlice.reducer;
