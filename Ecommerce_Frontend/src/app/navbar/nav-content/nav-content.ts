import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navigation } from './nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-content.html',
  styleUrl: './nav-content.css',
})
export class NavContent implements OnInit {
  @Input() selectedSection: any;

  public category: any;
@Output() close = new EventEmitter<void>(); // Add this line
  constructor(private router: Router) {}

  ngOnInit() {
    this.category = {
      men: {
        ...navigation.men,
        featured: [
          { 
            image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=400', 
            title: 'New Men Arrivals' 
          },
          { 
            image: "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70", 
            title: 'Men Accessories' 
          }
        ]
      },
      women: {
        ...navigation.women,
        featured: [
          { 
            // Fixed: changed 'imageUrl' to 'image'
            image: "https://rukminim1.flixcart.com/image/612/612/xif0q/lehenga-choli/y/d/8/l-3-4-sleeve-green-liva-original-imagmez3duzyzzxz.jpeg?q=70", 
            title: 'New Women Arrivals' 
          },
          { 
            // Fixed: changed 'imageUrl' to 'image'
            image: "https://rukminim1.flixcart.com/image/612/612/xif0q/lehenga-choli/5/n/h/l-3-4-sleeve-black-liva-original-imagmeyw2zzbch2g.jpeg?q=70", 
            title: 'Women Ethnic Wear' 
          }
        ]
      }
    };
  }

  
  handleNavigate = (path: string) => {
    this.router.navigate([path]);
    this.close.emit();
  };
}