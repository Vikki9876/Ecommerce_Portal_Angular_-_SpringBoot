import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store'; 
import { AuthService } from '../../../State/Auth/auth.service';
import { Router } from '@angular/router'; // 1. Import Router

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,     
    MatButtonModule     
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin implements OnInit, AfterViewInit { 
  @Input() changeTemplate: any; 

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router 
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

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
      this.authService.login(this.loginForm.value);
      
      console.log("Login request initiated", this.loginForm.value);
      
      this.router.navigate(['/']); 
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}