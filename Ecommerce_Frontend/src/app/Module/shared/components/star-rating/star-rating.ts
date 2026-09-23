import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { MatIconModule } from '@angular/material/icon'; // Required for mat-icon

@Component({
  selector: 'app-star-rating',
  standalone: true, // Ensure standalone is true if using 'imports'
  imports: [CommonModule, MatIconModule], 
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  maxRating = 5;
  initialRating = 3;

  stars: number[];
  currentRating = 0;

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.currentRating = this.initialRating;
  }

  rate(rating: number) {
    this.currentRating = rating;
  }
}