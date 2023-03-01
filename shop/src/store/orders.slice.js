import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        }
    }
});

export const ordersReducer = ordersSlice.reducer;

export const { setOrders, addOrder } = ordersSlice.actions;
