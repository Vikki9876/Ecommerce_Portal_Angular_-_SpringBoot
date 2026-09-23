import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store'; 
import { of } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { BASE_API_URL } from '../../config/api';
import { createPaymentFailure, createPaymentSuccess, updatePaymentFailure, updatePaymentSuccess } from './payment.action'; // Import success action

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  API_BASE_URL = BASE_API_URL;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createPayment(orderId: any) {
    const url = `${this.API_BASE_URL}/api/payments/${orderId}`;
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post(url, {}, { headers })
      .pipe(
        map((data: any) => {
          console.log("Payment created", data);
          
          if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
          }
          return createPaymentSuccess({ payload: data });
        }),
        catchError((error: any) => {
          const errorMessage = error.error?.message || error.message || 'An error occurred';
          return of(createPaymentFailure({ error: errorMessage }));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }


   updatePayment(reqData: any) {
    const url = `${this.API_BASE_URL}/api/payments?payment_id${reqData.paymentId}&order_id=${reqData.order_id}` ;
    console.log("update apamnet data" , reqData);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          console.log("Payment created", data);
          
          return updatePaymentSuccess({ payload: data });
        }),
        catchError((error: any) => {
          const errorMessage = error.error?.message || error.message || 'An error occurred';
          return of(updatePaymentFailure({ error: errorMessage }));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

}