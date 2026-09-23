import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and *ngIf
import { MatDividerModule } from '@angular/material/divider'; // Required for mat-divider
import { MatButtonModule } from '@angular/material/button';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { OrderService } from '../../../../State/Order/order.service';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../AppState';
import { select, Store } from '@ngrx/store';
import { PaymentService } from '../../../../State/Payment/payment.service';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,
    MatDividerModule,
    MatButtonModule,
    AddressCard,
    CartItem],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})

export class Payment {
  products=[1,1,1]
  order:any

  
constructor(private activatedRoute:  ActivatedRoute ,
  private orderService:OrderService,
  private store:Store<AppState>,
  private paymentService:PaymentService
)
{}
ngOnInit(){
  let id=this.activatedRoute.snapshot.paramMap.get("order_id")
console.log("id",id)
  if(id){
  this.orderService.getOrderById(id);
}
this.store.pipe(select(store=>store.order)).subscribe((order)=>{
  this.order=order.order
} )
}

redirectToPayment() {    
  if(this.order.id){
    this.paymentService.createPayment(this.order.id)
  }
  }
}
