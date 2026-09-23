import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and structural directives
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Required for <mat-progress-bar>
import { StarRating } from '../../../../shared/components/star-rating/star-rating';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-product-review-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatProgressBarModule, 
    StarRating, 
    ProductCard
  ],
  templateUrl: './product-review-card.html',
  styleUrl: './product-review-card.css',
})
export class ProductReviewCard {
  reviews = [1, 1, 1, 1, 1];

  // ADD THIS LINE:
  // This satisfies the *ngFor="let item of relatedProducts" in your HTML
  relatedProducts: any[] = [
    { id: 1, name: 'Sample Product 1', price: 100, imageUrl: '...' },
    { id: 2, name: 'Sample Product 2', price: 200, imageUrl: '...' }
  ];
  
}