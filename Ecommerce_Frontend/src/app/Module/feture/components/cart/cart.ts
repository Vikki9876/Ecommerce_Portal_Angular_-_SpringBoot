import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; // Added Inject, PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // Added this
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../../../State/Cart/cart.service';
import { AppState } from '../../../AppState';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  standalone: true, // Ensure standalone is true if you're using imports here
  imports: [CommonModule, CartItem, MatDividerModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  // Added this to fix the "Property 'cart' does not exist" error in HTML
  cart: any = true; 
  cartItems: any[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: Object // Injected Platform ID
  ) {}

  ngOnInit() {
  // 1. Initial Load from LocalStorage (Immediate)
  if (isPlatformBrowser(this.platformId)) {
    const localCart = localStorage.getItem("guestCart");
    if (localCart) {
      this.cartItems = JSON.parse(localCart);
      console.log("1. Initial Guest Load:", this.cartItems);
    }
  }

  // 2. Call the service to fetch latest data from DB
  this.cartService.getCart();

  // 3. Listen to the store
  this.store.pipe(select((store) => store.cart)).subscribe((cartData) => {
    console.log("2. Store received data:", cartData);

    // If the DB has items (User is logged in), use those.
    if (cartData && cartData.cartItems && cartData.cartItems.length > 0) {
      this.cartItems = cartData.cartItems;
      console.log("3. UI updated from Store");
    } 
    // If the Store is empty BUT we have Guest items, do NOT let the store clear them
    else if (this.cartItems.length === 0 && isPlatformBrowser(this.platformId)) {
      const localCart = localStorage.getItem("guestCart");
      if (localCart) {
        this.cartItems = JSON.parse(localCart);
        console.log("3. UI kept Guest Items");
      }
    }
  });
}

  navigateToCheckout() {
    // Wrap in browser check to prevent SSR crash
    if (isPlatformBrowser(this.platformId)) {
      const jwt = localStorage.getItem("jwt");

      if (jwt) {
        this.router.navigate(["checkout"]);
      } else {
        // Redirect to login with a return URL
        this.router.navigate(["/login"], { queryParams: { redirect: 'checkout' } });
      }
    }
  }
}