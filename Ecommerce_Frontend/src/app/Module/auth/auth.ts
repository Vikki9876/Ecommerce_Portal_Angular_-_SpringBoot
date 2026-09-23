import { Component } from '@angular/core';
import { Signin } from './signin/signin'; 
import { Signup } from './signup/signup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [Signup ,Signin ,CommonModule ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {

isLoggedIn=true;

changeTemplate(){
  this.isLoggedIn=!this.isLoggedIn;
}

}
