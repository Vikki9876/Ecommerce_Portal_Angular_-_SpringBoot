import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.action';

export interface OrderState {
  orders: any[];
  order: any | null;
  loading: boolean;
  error: string | null;
}

export const initialState: OrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

export const orderReducer = createReducer(
  initialState,

  // --- REQUESTS ---
  on(
    OrderActions.createOrderRequest,
    OrderActions.getOrderHistoryRequest,
    OrderActions.getOrderByIdRequest,
    OrderActions.deleteOrderRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  // --- FAILURE HANDLERS ---
  on(
    OrderActions.createOrderFailure,
    OrderActions.getOrderHistoryFailure,
    OrderActions.getOrderByIdFailure,
    OrderActions.deleteOrderFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  ),

  // --- SUCCESS HANDLERS ---
  on(OrderActions.createOrderSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    order: payload,
    // Optional: Add to history list immediately
    orders: [payload, ...state.orders] 
  })),

  on(OrderActions.getOrderHistorySuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    orders: payload,
  })),

  on(OrderActions.getOrderByIdSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    order: payload, 
  })),

  on(OrderActions.deleteOrderSuccess, (state, { orderId }) => ({
    ...state,
    loading: false,
    orders: state.orders.filter((order) => order.id !== orderId),
    order: state.order?.id === orderId ? null : state.order,
  }))
);