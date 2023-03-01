import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import { ordersReducer } from './orders.slice';

const reducer = {
  cart: cartReducer,
  orders: ordersReducer,
};

const store = configureStore({
  reducer
});

export default store;