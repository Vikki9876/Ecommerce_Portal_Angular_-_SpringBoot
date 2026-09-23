import { Component,Input, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter} from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import {  ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store'; 
import { AuthService } from '../../../State/Auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit, AfterViewInit { 
  @Input() changeTemplate: any; 

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store,
    private cdr: ChangeDetectorRef,
    private authService:AuthService 
  ) {
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.cdr) {
        this.cdr.detectChanges();
      }
    }, 0);
  }
  

  @Output() toggle = new EventEmitter<void>();

  // 3. This method will be called when you click the button
  onToggleClick() {
    this.toggle.emit();
  }
  
  submitForm(): void {
    if (this.loginForm.valid) {
      console.log("signup req data", this.loginForm.value);
   this.authService.register(this.loginForm.value )
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}