import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.action';

export interface CartState {
  cart: any;
  cartItems: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
 on(
    CartActions.addItemToCartRequest,
    CartActions.getCartRequest,
    CartActions.updateCartItemRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  on(CartActions.addItemToCartSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    cartItems: [...state.cartItems, payload], 
  })),

  on(CartActions.getCartSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    cart: payload,
    cartItems: payload.cartItems || [], 
  })),

  on(CartActions.removeCartItemSuccess, (state, { cartItemId }) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.filter((item) => item.id !== cartItemId),
  })),

  on(CartActions.updateCartItemSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.map((item) =>
      item.id === payload.id ? payload : item
    ),
  })),

  on(
    CartActions.addItemToCartFailure,
    CartActions.getCartFailure,
    CartActions.removeCartItemFailure,
    CartActions.updateCartItemFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);