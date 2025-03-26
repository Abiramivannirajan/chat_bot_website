import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { couchchatbotService } from '../../../services/couchchatbot.service';

@Component({
  selector: 'app-jobseeker-nav-bar',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './jobseeker-nav-bar.component.html',
  styleUrl: './jobseeker-nav-bar.component.css'
})
export class JobseekerNavBarComponent implements OnInit {
  currentUser: string ='';  // Store user data
  
 

  constructor(private couchchat:couchchatbotService, private router: Router) {}
  
  ngOnInit(): void {
    this.currentUser = this.couchchat.getLoggedInUser(); // Get user data from service
    console.log("user",this.currentUser);
  }

logOut() {
  this.couchchat.logout(); // Clear session data
  this.router.navigate(['/login']); // Navigate to login page
  this.currentUser = "";

}



}
