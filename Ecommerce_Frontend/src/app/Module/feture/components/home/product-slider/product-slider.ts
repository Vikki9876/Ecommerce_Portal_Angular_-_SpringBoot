
import { Component, Input } from '@angular/core';
import { HomeProductCard } from '../home-product-card/home-product-card'; 

@Component({
  selector: 'app-product-slider',
  standalone: true, 
  imports: [HomeProductCard], 
  templateUrl: './product-slider.html',
  styleUrl: './product-slider.css',
})
export class ProductSlider {
  @Input() title: any;
  @Input() products: any;
}