import { Component, OnInit, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { OrderService } from '../../../../State/Order/order.service'; 
import { AppState } from '../../../AppState';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { OrderCard } from './order-card/order-card';
import { map, filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatCheckboxModule, OrderCard],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  
  private allOrdersSignal = signal<any[]>([]);
  private selectedStatusesSignal = signal<string[]>([]);

  orders = computed(() => {
    const allOrders = this.allOrdersSignal();
    const selectedStatuses = this.selectedStatusesSignal();

    if (selectedStatuses.length === 0) {
      return allOrders;
    }
    return allOrders.filter(item => selectedStatuses.includes(item.orderStatus));
  });

  orderFilter = [
    { label: 'Placed', value: 'PLACED' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Cancelled', value: 'CANCELLED' }
  ];

  constructor(
    private orderService: OrderService,
    private store: Store<AppState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.store.pipe(
      select((store) => store.order),
      filter(orderState => !!orderState && !!orderState.orders),
      map(orderState => orderState.orders),
      takeUntilDestroyed() 
    ).subscribe((orders) => {
      console.log('Value of orderStatus on first order:', orders[0]?.orderStatus);
      this.allOrdersSignal.set(orders);
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.orderService.getOrderHistory();
    }
  }

  navigateOrderDetails(orderId: any) {
    this.router.navigate([`/order/${orderId}`]); 
  }

  onFilterChange(event: any, statusValue: string) {
    const currentStatuses = this.selectedStatusesSignal();
    
    if (event.checked) {
      this.selectedStatusesSignal.set([...currentStatuses, statusValue]);
    } else {
      this.selectedStatusesSignal.set(currentStatuses.filter(status => status !== statusValue));
    }
  }
}