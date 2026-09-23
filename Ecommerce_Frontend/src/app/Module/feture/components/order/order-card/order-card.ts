import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard {

  @Input() orderData: any;
  
constructor(private router:Router ){

}
navigateOrderDetails=(id:Number)=>{
  this.router.navigate([`orders/${id}`])
}

}
