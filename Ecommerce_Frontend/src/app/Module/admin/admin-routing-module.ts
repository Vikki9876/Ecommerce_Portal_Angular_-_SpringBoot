import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './components/admin';
import { Dashboard } from './components/dashboard/dashboard';
import { AdminProducts } from './components/admin-products/admin-products';
import { OrdersTable } from './components/orders-table/orders-table';
import { Customers } from './components/customers/customers';
import { CreateProduct } from './components/create-product/create-product';

const routes: Routes = [

  {path:"" ,component:Admin , children: [
   {path:"" , component:Dashboard },
   {path:"products",component:AdminProducts } ,
   {path:"orders",component:OrdersTable } ,
   {path:"customers",component:Customers },
   {path:"create-product",component:CreateProduct }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
