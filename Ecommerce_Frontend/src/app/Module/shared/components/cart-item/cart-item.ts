import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../../../../State/Cart/cart.service';
@Component({
  selector: 'app-cart-item',
  imports: [MatButtonModule, CommonModule ,MatIconModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  
  @Input() cartItem:any;
  @Input() showButton:any;

constructor(
  private cartService: CartService,
  private cd: ChangeDetectorRef 
){}

  updateCartItem(num: number) {
    const newQuantity = this.cartItem.quantity + num;
    
    if (newQuantity >= 1) {
      this.cartService.updateCartItem({
        cartItemId: this.cartItem.id,
        data: { quantity: newQuantity }
      });
     setTimeout(() => {
        this.cd.detectChanges();
      }, 100);
    }
  }

  removeCartItem() {
    this.cartService.removeCartItem(this.cartItem.id);
    this.cd.detectChanges();
  }
}