import { Component } from '@angular/core';
import { OrderCard } from '../order/order-card/order-card';
import { OrderTracker } from '../../../shared/components/order-tracker/order-tracker';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [OrderCard, OrderTracker,AddressCard ,CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {

  orders=[1,1,1]

  steps=[
    {id:0 ,title:"PLACED" ,isCompleted:false},
    {id:1 ,title:"CONFIRMED" ,isCompleted:false},
    {id:2 ,title:"SHIPPED" ,isCompleted:false},
    {id:3 ,title:"DELIVERED" ,isCompleted:false}
  ]


}
