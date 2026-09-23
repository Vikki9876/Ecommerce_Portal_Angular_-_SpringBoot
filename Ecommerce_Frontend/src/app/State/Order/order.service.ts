import { Injectable, Inject, PLATFORM_ID } from "@angular/core"; // 1. Added Inject and PLATFORM_ID
import { isPlatformBrowser } from "@angular/common"; // 2. Added isPlatformBrowser
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { BASE_API_URL } from "../../config/api";
import { createOrderFailure, createOrderSuccess, deleteOrderFailure, deleteOrderSuccess, getOrderByIdFailure, getOrderByIdSuccess, getOrderHistoryFailure, getOrderHistorySuccess } from "./order.action";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_BASE_URL = BASE_API_URL;
    
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // 3. Injected platformId into constructor
  ) {}

  private getHeader(): HttpHeaders {
    let token = '';

    // 4. Wrap local storage access in a browser validation check
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem("jwt") || '';
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createOrder(reqData: any) {
    const headers = this.getHeader();
    const url = `${this.API_BASE_URL}/api/orders`;

    return this.http
      .post(url, reqData, { headers })
      .pipe(
        map((data: any) => {
          console.log("order created successfully ", data);
          if(data.id){
            this.router.navigate([`/checkout/payment/${data.id}`],{
                queryParams: { step: '3',order_id: data.id },    
                });
          }
          return createOrderSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(createOrderFailure(this.getErrorMsg(error)));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderHistory() {
    const headers = this.getHeader();
    const url = `${this.API_BASE_URL}/api/orders/user`;

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          console.log("order history fetched ", data);
          return getOrderHistorySuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(getOrderHistoryFailure(this.getErrorMsg(error)));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderById(orderId: string) {
    const headers = this.getHeader();
    const url = `${this.API_BASE_URL}/api/orders/${orderId}`;

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          console.log("order details fetched ", data);
          return getOrderByIdSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(getOrderByIdFailure(this.getErrorMsg(error)));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deleteOrder(orderId: any) {
    const headers = this.getHeader();
    const url = `${this.API_BASE_URL}/api/orders/${orderId}/delete`;

    return this.http
      .delete(url, { headers })
      .pipe(
        map((data: any) => {
          console.log("order deleted successfully ", data);
          return deleteOrderSuccess({ orderId });
        }),
        catchError((error: any) => {
          return of(deleteOrderFailure(this.getErrorMsg(error)));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private getErrorMsg(error: any) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
}