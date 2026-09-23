import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import { BASE_API_URL } from "../../config/api";
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from ".././Auth/auth.actions";
import { Store } from "@ngrx/store";
import { UserService } from "../User/user.service";
import { CartService } from "../Cart/cart.service"; // 1. Import CartService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${BASE_API_URL}/auth`;

  constructor(
    private http: HttpClient,
    private store: Store,
    private userService: UserService,
    private cartService: CartService // 2. Inject CartService
  ) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      map((res: any) => {
        if (res.jwt) {
          localStorage.setItem("jwt", res.jwt);
          this.syncGuestCart(); // 3. Sync on Signup
        }
        return registerSuccess({ user: res });
      }),
      catchError((error) => {
        return of(
          registerFailure(
            error.response && error.response.data.message ?
            error.response.data.message : error.message
          )
        );
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  login(loginData: any) {
    return this.http.post(`${this.apiUrl}/signin`, loginData).pipe(
      map((user: any) => {
        console.log('login user', user);
        if (user.jwt) {
          localStorage.setItem("jwt", user.jwt);
          this.userService.getUserProfile();
          this.syncGuestCart(); // 4. Sync on Login
        }
        return loginSuccess(user);
      }),
      catchError((error) => {
        return of(
          loginFailure(
            error.response && error.response.data.message ?
            error.response.data.message : error.message
          )
        );
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  // 5. Helper method to move items from LocalStorage to Database
  private syncGuestCart() {
    const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
    
    if (guestCart.length > 0) {
      console.log("Syncing guest cart to user account...");
      
      guestCart.forEach((item: any) => {
        // This will now send the request with the JWT token in headers
        this.cartService.addItemToCart(item);
      });

      // Clear the local storage so we don't sync again next time
      localStorage.removeItem('guest_cart');
      
      // Refresh the store with the merged data from backend
      this.cartService.getCart();
    }
  }
}