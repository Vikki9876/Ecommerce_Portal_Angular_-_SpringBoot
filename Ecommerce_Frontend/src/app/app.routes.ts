import { Routes } from '@angular/router';
import { Home } from './Module/feture/components/home/home';
import { Products } from './Module/feture/components/products/products';
import { Cart } from './Module/feture/components/cart/cart';
import { ProductDetails } from './Module/feture/components/product-details/product-details';
import { Checkout } from './Module/feture/components/checkout/checkout';
import { Payment } from './Module/feture/components/payment/payment';
import { PaymentSuccess } from './Module/feture/components/payment-success/payment-success';
import { Order } from './Module/feture/components/order/order';
import { OrderDetails } from './Module/feture/components/order-details/order-details';
import { AdminRoutingModule } from './Module/admin/admin-routing-module';

export const routes: Routes = [

    {path:"admin", loadChildren:()=>import("./Module/admin/admin-routing-module").then(m=>AdminRoutingModule)  },
  {path:"" ,component:Home},
  {path:"cart" ,component:Cart },
  {path:"product-details/:id",component:ProductDetails },
  {path:"checkout" ,component:Checkout },
  {path:"checkout/payment/:id", component:Payment},  
  {path:':lavelOne/:lavelTwo/:lavelThree',component:Products },
  {path:"payment-success" ,component:PaymentSuccess },
  {path:"account/orders" ,component:Order },
  {path:"order/:id" ,component:OrderDetails },
  { path: '', component: Home },
  { path: 'women/clothing/LenghaCholi', component: Home }, 
  { path: 'women/clothing/women_dress', component: Home },
  { path: 'women/clothing/women_saree', component: Home },
  { path: '**', redirectTo: '' }
];