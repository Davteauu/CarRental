import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroImportsModule } from './NgZorroImportsModule';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NgZorroImportsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isCustomerLoggedIn();


  constructor(private router: Router) {}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }


 }
