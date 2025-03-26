import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { couchchatbotService } from '../../services/couchchatbot.service';
import { JobseekerNavBarComponent } from "../../modules/jobseeker-module/jobseeker-nav-bar/jobseeker-nav-bar.component";


@Component({
  selector: 'app-commonlogin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule, JobseekerNavBarComponent],
  templateUrl: './commonlogin.component.html',
  styleUrl: './commonlogin.component.css',
  providers: [HttpClient],
})
export class CommonloginComponent {
  email: string = '';
  password: string = ''; //undefined
  userType: string = '';
  isFormSubmitted = false;
  data:any

  loginStatus : boolean = false;

  emailError='';
  passwordError='';
  
  private router = inject(Router);

  constructor(private couchchatbot: couchchatbotService) {}
  // Handle form submission
  onLogin(form: NgForm) {
    this.isFormSubmitted = true;

    if (form.invalid) {
      alert('Please fill all fields correctly');
      return;
    }

    // Call getUser to check if the user exists
    this.couchchatbot.checkUser(this.email).subscribe({
      next: (response: any) => {
        if(response.rows.length===0){
          this.emailError='email not found'
          return ;
        }
        console.log(response);
        
        const userdata=response.rows[0].doc.data;
        const userId = response.rows[0].doc._id;
        console.log(userdata);
        console.log(userId);
        if(userdata.password!== this.password){
          this.passwordError='Incorrect Password'
          return
        }
        
        let userType : string = userdata.userType;
        console.log('Response from DB:',userType);
        console.log(userdata)
        this.couchchatbot.currentuser = userdata.name;
        this.loginStatus=true;

        this.couchchatbot.setLoggedUser(userdata.name, userId);
        if(this.loginStatus === true){
          if(userType === 'student')
            this.router.navigate(['/home']);
          else if(userType ==='jobseeker')
            this.router.navigate(['/job-seeker-home-page']);
          else if(userType==='Admin')
            this.router.navigate(['./admin-view'])
        }
      },
    });
  }
  // reset the form 
  resetForm(form: NgForm) {
    form.resetForm(); 
    this.email = '';
    this.password = '';
    this.userType = '';
    this.loginStatus=false;
    this.emailError='';
    this.passwordError='';
  }
}
