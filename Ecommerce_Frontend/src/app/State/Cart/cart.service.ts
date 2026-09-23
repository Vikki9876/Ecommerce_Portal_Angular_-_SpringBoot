import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

import { BASE_API_URL } from "../../config/api";
import * as CartActions from "./cart.action";
import {
  addItemToCartFailure,
  getCartFailure,
  getCartSuccess,
  removeCartItemSuccess,
  updateCartItemSuccess
} from "./cart.action";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private API_BASE_URL = BASE_API_URL;

  constructor(
    private http: HttpClient,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getJwt(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  private isLoggedIn(): boolean {
    return !!this.getJwt();
  }

  private getHeaders(): HttpHeaders {
    const token = this.getJwt();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

 addItemToCart(reqData: any) {
  // 1. Check if user is logged in
  if (!this.isLoggedIn()) {
    console.log("User not logged in, saving to local storage...");
    const currentGuestCart = JSON.parse(localStorage.getItem("guestCart") || '[]');
    currentGuestCart.push(reqData);
    localStorage.setItem("guestCart", JSON.stringify(currentGuestCart));
   this.store.dispatch(CartActions.addItemToCartSuccess({ payload: { cartItems: currentGuestCart } }));
    return; 
  }

  // 2. If logged in, proceed with the API call
  const url = `${this.API_BASE_URL}/api/cart/add`;

  this.http.put(url, reqData, { headers: this.getHeaders() })
    .pipe(
      map((data: any) =>
        CartActions.addItemToCartSuccess({ payload: data })
      ),
      catchError((error: any) =>
        of(CartActions.addItemToCartFailure(this.getErrorMsg(error)))
      )
    )
    .subscribe(action => this.store.dispatch(action));
}


  getCart() {
  // 1. Check if we are running in the browser to avoid SSR errors with localStorage
  if (isPlatformBrowser(this.platformId)) {
    
    if (!this.isLoggedIn()) {
      // 2. Guest Logic: Load from localStorage
      const localData = localStorage.getItem("guestCart");
      const guestItems = localData ? JSON.parse(localData) : [];
      
      // Dispatch the data to the store so the UI (Cart Page) can see it
      this.store.dispatch(getCartSuccess({ 
        payload: { cartItems: guestItems } 
      }));
      return; // Stop here, don't call the API
    }
  } else {
    // If we are on the Server (SSR), just exit to prevent crashes
    return;
  }

  // 3. Logged-in Logic: API Call
  const url = `${this.API_BASE_URL}/api/cart/`;

  this.http.get(url, { headers: this.getHeaders() })
    .pipe(
      map((data: any) => getCartSuccess({ payload: data })),
      catchError((error: any) => {
        if (error.status === 403) return of(); 
        return of(getCartFailure(this.getErrorMsg(error)));
      })
    )
    .subscribe(action => {
      if (action) this.store.dispatch(action);
    });
}


  removeCartItem(cartItemId: number) {
    if (!this.isLoggedIn()) return;

    const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;

    this.http.delete(url, { headers: this.getHeaders() })
      .pipe(
        map(() =>
          removeCartItemSuccess({ cartItemId })
        ),
        catchError((error: any) =>
          of(CartActions.removeCartItemFailure(this.getErrorMsg(error)))
        )
      )
      .subscribe(action => this.store.dispatch(action));
  }

  updateCartItem(reqData: any) {
    if (!this.isLoggedIn()) return;

    const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;

  return this.http.put(url, reqData.data, { headers: this.getHeaders() })
      .pipe(
        map((data: any) =>
          updateCartItemSuccess({ payload: data })
        ),
        catchError((error: any) =>
          of(CartActions.updateCartItemFailure(this.getErrorMsg(error)))
        )
      )
      .subscribe(action => this.store.dispatch(action));
  }

  private getErrorMsg(error: any) {
    return error?.error?.message || error.message || "Unknown error";
  }
}