import { Component,  OnInit, OnDestroy, ChangeDetectorRef 
} from '@angular/core'; 

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeCarouselData } from '../../../../../../Data/mainCarousel';

@Component({
  selector: 'app-main-carousel',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './main-carousel.html',
  styleUrls: ['./main-carousel.css']
})
export class MainCarousel implements OnInit, OnDestroy { 
  carouselData: any;
  currentSlide = 0;
  private interval: any; 

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carouselData = homeCarouselData;
    this.startAutoplay();
  }

  startAutoplay(): void {
    this.stopAutoplay();
    
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000); 
  }

  stopAutoplay(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  nextSlide(): void {
    if (this.carouselData && this.carouselData.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
      
      this.cdr.detectChanges(); 
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}