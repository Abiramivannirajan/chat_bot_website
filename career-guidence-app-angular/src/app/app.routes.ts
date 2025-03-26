import { Routes } from '@angular/router';
import { HomeComponent } from './modules/student-module/home/home.component';
import { PersonalAssessentComponent } from './modules/student-module/personal-assessent/personal-assessent.component';
import { AdminViewComponent } from './modules/admin-module/admin-view/admin-view.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { CommonloginComponent } from './login/commonlogin/commonlogin.component';
import { RegisterComponent } from './login/register/register.component';
import { SkillAssessentComponent } from './modules/jobseeker-module/skill-assessent/skill-assessent.component';
import { PredictedStreamComponent } from './modules/student-module/predicted-stream/predicted-stream.component';
import { StreamComponent } from './modules/student-module/stream/stream.component';
import { SubstreamsComponent } from './modules/student-module/substream/substream.component';
import { TrendingCoursesComponent } from './modules/student-module/trending-courses/trending-courses.component';
import { JobSeekerHomePageComponent } from './modules/jobseeker-module/jobseeker-home-page/jobseeker-home-page.component';
import { FindYourJobsComponent } from './modules/jobseeker-module/find-your-jobs/find-your-jobs.component';
import { InterviewPrepareComponent } from './modules/jobseeker-module/interview-prepare/interview-prepare.component';
import { ChatbotmoduleComponent } from './modules/chatbotmodule/chatbotmodule.component';
import { ApplicationFormComponent } from './modules/jobseeker-module/application-form/application-form.component';
import { MockInterviewComponent } from './modules/jobseeker-module/mock-interview/mock-interview.component';
import { ApplicationViewComponent } from './modules/jobseeker-module/application-view/application-view.component';
import { DiscoverFreeCoursesComponent } from './modules/jobseeker-module/discover-free-courses/discover-free-courses.component';
import { FreeCoursesComponent } from './modules/jobseeker-module/free-courses/free-courses.component';
import { JobseekerNavBarComponent } from './modules/jobseeker-module/jobseeker-nav-bar/jobseeker-nav-bar.component';




export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin-view', component: AdminViewComponent },
  { path: 'skill-assessment', component: SkillAssessentComponent },
  { path: 'common-login', component: CommonloginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'personal-assessment', component: PersonalAssessentComponent },
  { path: "trending-courses", component: TrendingCoursesComponent },
  { path: 'predicted-stream', component: PredictedStreamComponent },
  { path: 'chat-bot', component: ChatbotmoduleComponent },
  { path: 'stream', component: StreamComponent },
  { path: 'substream', component: SubstreamsComponent },
  {path:'stream/:id',component:SubstreamsComponent},
  { path: 'job-seeker-home-page', component: JobSeekerHomePageComponent },
  { path: 'skill-assessent', component: SkillAssessentComponent },
  { path: 'interview-prepare', component: InterviewPrepareComponent },
  { path: 'find', component: FindYourJobsComponent },
  { path: 'trending-courses', component: TrendingCoursesComponent },
  { path: 'form', component: ApplicationFormComponent },
  {path: 'mock-interviews',component: MockInterviewComponent},
  {path: 'application-view',component:ApplicationViewComponent},
  {path:'discover-free-courses',component:DiscoverFreeCoursesComponent},
  {path:'free-courses',component:FreeCoursesComponent},
  {path:'job/:id',component:ApplicationViewComponent},
  {path:'navbar-jobseeker',component:JobseekerNavBarComponent},
  { path: '**', redirectTo: '' }, 
];



