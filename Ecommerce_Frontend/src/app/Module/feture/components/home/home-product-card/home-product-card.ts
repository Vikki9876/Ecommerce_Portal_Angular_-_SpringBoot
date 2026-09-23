import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-home-product-card',
  imports: [],
  templateUrl: './home-product-card.html',
  styleUrl: './home-product-card.css',
})
export class HomeProductCard {

  @Input() product:any

}
