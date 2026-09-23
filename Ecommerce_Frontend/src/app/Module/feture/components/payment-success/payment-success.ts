import { Component } from '@angular/core';
import { OrderService } from '../../../../State/Order/order.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../../State/Payment/payment.service';
import { AppState } from '../../../AppState';
import { select, Store } from '@ngrx/store';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment-success',
  imports: [AddressCard, CommonModule],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess {

   orderId:any
   paymentId:any
    order:any
 
  constructor(
    private orderService:OrderService ,
    private paymentService:PaymentService ,
    private route:ActivatedRoute,
     private store: Store<AppState>

  ){}

  ngOnInit(){
    this.route.queryParams.subscribe((params)=>{
      this.orderId=params["order_id"]
      this.paymentId=params["razorpay_payment_id"]
    } );

    this.orderService.getOrderById(this.orderId);
    const reqData= {
      orderId: this.orderId,
     paymentId:this.paymentId }
    this.paymentService.updatePayment(reqData)

    this.store.pipe(select((store) => store.order)).subscribe((order)=> {
      this.order=order.order ;
    } )
  }
}
