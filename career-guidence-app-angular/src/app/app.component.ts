import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./modules/student-module/nav-bar/nav-bar.component";
import {  HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillAssessentComponent } from "./modules/jobseeker-module/skill-assessent/skill-assessent.component";
import { JobSeekerHomePageComponent } from './modules/jobseeker-module/jobseeker-home-page/jobseeker-home-page.component';
import { ChatbotmoduleComponent } from './modules/chatbotmodule/chatbotmodule.component';
import { MockInterviewComponent } from './modules/jobseeker-module/mock-interview/mock-interview.component';
import { ApplicationViewComponent } from './modules/jobseeker-module/application-view/application-view.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, RouterModule, HttpClientModule, FormsModule, CommonModule,  SkillAssessentComponent, ChatbotmoduleComponent, JobSeekerHomePageComponent,MockInterviewComponent,ApplicationViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'career-guidence-app-angular';
  
  routeval:boolean=false
  route(){
    this.routeval=!this.routeval
  }
  }
