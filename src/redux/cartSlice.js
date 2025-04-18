import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // array of cart items
    totalQuantity: 0, // total number of units (for badge)
    totalPrice: 0, // total cost
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += product.price;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                    totalPrice: product.price,
                });
            }

            state.totalQuantity += 1;
            state.totalPrice += product.price;
        },

        removeFromCart: (state, action) => {
            const productId = action.payload;
            const existingItem = state.items.find(item => item.id === productId);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== productId);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                item.totalPrice += item.price;
                state.totalQuantity += 1;
                state.totalPrice += item.price;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.totalPrice -= item.price;
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                } else {
                    // Remove item if quantity is 1
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
