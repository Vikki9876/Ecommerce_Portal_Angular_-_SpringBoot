import { Component, signal, Inject, PLATFORM_ID, OnInit } from '@angular/core'; 
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './State/User/user.service';
import { AppState } from './Module/AppState';
import { CartService } from './State/Cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, Navbar, Footer, RouterModule 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-angular');
  userProfile: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userSerivce: UserService,
    private cartService:CartService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}  
  
 ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.userSerivce.getUserProfile();
      this.cartService.getCart();
    }
  }
  this.store.pipe(select((state: any) => state.user)).subscribe((userState) => {
    this.userProfile = userState.userProfile;
    this.cartService.getCart();
  if (userState.userProfile) {
      this.dialog.closeAll();
    }
  });
}
}