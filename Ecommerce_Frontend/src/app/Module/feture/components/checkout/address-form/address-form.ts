import { Component } from '@angular/core';
import { AddressCard } from '../../../../shared/components/address-card/address-card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';
import { OrderService } from '../../../../../State/Order/order.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule, 
    MatDividerModule, 
    AddressCard,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
   ],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css',
})
export class AddressForm {
  adresses = [
    {
      firstName: "John",
      lastName: "Doe",
      streetAddress: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      mobile: "1234567890"
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      streetAddress: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      mobile: "9876543210"
    }
  ];
  
  myForm: FormGroup;

  constructor( private orderService:OrderService,  private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      streetAddress: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipCode: ["", Validators.required],
      mobile: ["", Validators.required]
    });
  }


  
  handleCreateOrder(item: any) {
    
  }

  handleSubmit=()=>{
    const formValue=this.myForm.value
    this.orderService.createOrder(formValue)
    console.log("form submitted",formValue)
  }
}