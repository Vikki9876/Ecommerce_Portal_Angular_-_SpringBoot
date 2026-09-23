import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Import this!
import { MatIconModule } from '@angular/material/icon'; // For the star icon
import { lehngacholiPage2 } from '../../../../../Data/Saree/lehngacholi_Page2';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../AppState';
import { CartService } from '../../../../State/Cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatRadioModule, 
    MatButtonModule, 
    MatProgressBarModule, 
    MatIconModule,
    ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  selectedSize: any='';
  reviews=[1,1,1];
  relatedProducts:any;
  product:any;
  productId:any;

constructor(private router:Router ,
  private productService:ProductService ,
  private activatedRoute:ActivatedRoute ,
 private cartService:CartService,
  private store:Store<AppState> ,
  private cd: ChangeDetectorRef,
  private snackBar: MatSnackBar,
)
{
}

  ngOnInit(){
    this.relatedProducts=lehngacholiPage2  ;
    const id=this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.findProductById(id)
   this.productId=id
    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
      this.product=product?.product
      this.cd.detectChanges();
      console.log("store data",product.product )
    } )
  }



 handleAddToCart() {
  if (!this.selectedSize) {
    alert("Please select a size!");
    return;
  }

  const itemData = { 
    size: this.selectedSize, 
    productId: this.productId, 
    quantity: 1 
  };
  
  const token = localStorage.getItem('jwt');

  if (!token) {
    let guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
    guestCart.push(itemData);
    localStorage.setItem('guest_cart', JSON.stringify(guestCart));
    
    this.router.navigate(['cart']);
  } else {
    this.cartService.addItemToCart(itemData);
    this.router.navigate(['cart']);
  }
}



}

