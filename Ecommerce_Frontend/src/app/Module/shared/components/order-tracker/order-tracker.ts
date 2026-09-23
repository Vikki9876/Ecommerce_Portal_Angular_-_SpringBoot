import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-tracker',
  imports: [CommonModule,MatDividerModule ,
    MatIconModule],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.css',
})
export class OrderTracker {

  @Input() activeStep:any
  @Input() steps:any


}
