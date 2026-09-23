import { Component, HostListener, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Added isPlatformBrowser
import { NavContent } from './nav-content/nav-content';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Auth } from '../Module/auth/auth';
import { UserService } from '../State/User/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../Module/AppState';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavContent, RouterLink, CommonModule,MatDividerModule, MatIconModule, MatButtonModule, RouterLink, MatMenuModule, MatDialogModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private userService: UserService, 
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: Object, // 1. Inject the Platform ID
     private  cd: ChangeDetectorRef

  ) {}


  
isLoggedIn: boolean = false;
  currentSection: any;
  isNavbarContentOpen: any;
  userProfile: any;
 
  openNavbarContent(section: any) {
  if (this.isNavbarContentOpen && this.currentSection === section) {
    this.closeNavbarContent();
  } else {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
  }
}

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }

 ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.userService.getUserProfile();
    }
  }

  this.store.pipe(select((state) => state.user))
    .subscribe((userState) => {
      setTimeout(() => {
        if (userState && userState.userProfile) {
          this.userProfile = userState.userProfile;
          this.isLoggedIn = true;
          this.dialog.closeAll();
        } else {
          this.isLoggedIn = false;
          this.userProfile = null;
        }

        this.cd.detectChanges();
      }, 0); 
    }); 
}


handleCartClick() {
  if (this.userProfile) {
    this.navigateTo('cart');
  } else {
    alert('Please log in to view your shopping cart.');
    this.handleOpenLoginModal(); 
  }
}


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      const modalContainer = document.querySelector(".modal-container");
      const openButtons = document.querySelectorAll(".open-button");

      let clickInsideButton = false;

      openButtons?.forEach((button: Element) => {
        if (button.contains(event.target as Node)) {
          clickInsideButton = true;
        }
      });

      if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
        this.closeNavbarContent();
      }
    }
  }

  handleOpenLoginModal = () => {
   console.log("handle open login module")
    this.dialog.open(Auth, {
      width: '400px',
      disableClose: false,
    });
  }

  handleLogout() {
    localStorage.removeItem('jwt');
    this.userProfile = null;
    this.router.navigate(['/']);
}
}