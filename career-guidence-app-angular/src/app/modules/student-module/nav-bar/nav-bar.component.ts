import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { NgIf } from '@angular/common'

import { couchchatbotService } from '../../../services/couchchatbot.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  currentuser: any = null;  // Store user data
  constructor(private couchchat: couchchatbotService, private router: Router) { }

  ngDoCheck() {
    this.currentuser = this.couchchat.getLoggedInUser(); // Get user data from service
    console.log("USER");

    console.log(this.currentuser);
  }
  // home.component.ts
  logout() {
    this.couchchat.logout(); // Clear session data
    this.router.navigate(['/login']); // Navigate to login page
  }
}