import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { JobseekerNavBarComponent } from "../jobseeker-nav-bar/jobseeker-nav-bar.component";

@Component({
  selector: 'app-jobseeker-home-page',
  templateUrl: './jobseeker-home-page.component.html',
  styleUrls: ['./jobseeker-home-page.component.css'],
  standalone:true,
  imports: [CommonModule, RouterModule, JobseekerNavBarComponent]
})
export class JobSeekerHomePageComponent {

  dreamPathText = "Start Your Journey to the Perfect Job";
  dreamPathDescription = "Finding the right career path can be challenging, but you're not alone. Our Dream Path Guidance service helps you identify your strengths, skills, and interests, guiding you toward the perfect job that aligns with your dreams. Whether you're just starting your career or looking for a new direction, we're here to help you take the next step.";

  features = [
    { title: "Resume Builder", description: "Craft a standout resume with our easy-to-use tool that highlights your unique talents and experience.", button: "More-info", route: "/resume-builder" },
    { title: "Mock-interviews", description:"Prepare for your next big interview with tips, mock interviews, and expert advice Get personalized coaching to boost your confidence .", button: "More-info", route: "/mock-interviews" },
    { title: "Job Alerts", description: "Stay up-to-date with the latest job openings through personalized email notifications based on your preferences.", button: "More-info", route: "/find" },
    { title: "Career Development", description: "Access resources and courses to enhance your skills and advance your career.", button: "More-info", route: "/career-development" }
  ];

  currentUser : string = "";

  constructor(readonly couchchatbot: couchchatbotService){}

  ngOnInit(){
    this.currentUser = this.couchchatbot.getLoggedInUser() ?? "";
  }

  getRouteForFeature(feature: any) {
    return feature.route;
  }
  whyPeopleChooseUs = [
    { title: "Tailored Approach", description: "Our platform provides a personalized experience designed to match you with the right opportunities based on your preferences." },
    { title: "Expert Guidance", description: "Our team of career experts is dedicated to offering you professional advice and insights to help you succeed." },
    { title: "Real-Time Opportunities", description: "We work with top employers to provide the latest job openings, ensuring you're always in the know." },
    { title: "Job Seeker Community", description: "Join a supportive community of like-minded individuals where you can share tips, experiences, and job leads." }
  ];

  faq = [
    { question: "How do I get started?", answer: "Simply sign up, complete your profile, and start exploring job listings, tools, and career advice." },
    { question: "Is there a cost to use the platform?", answer: "Basic access to our job listings and resources is free! Premium features such as interview coaching and personalized guidance are available through a subscription." },
    { question: "Can I receive job alerts?", answer: "Yes! Once you’ve completed your profile, you can set up job alerts to receive notifications about new opportunities that match your interests." },
    { question: "How can I improve my resume?", answer: "Our Resume Builder will help you create a polished and professional resume with step-by-step guidance and tips." },
    { question: "Do you provide job placement services?", answer: "While we don’t directly place you in a job, we offer tools and expert advice to help you secure the job of your dreams." }
  ];

  footerLinks = [
    { name: 'Contact Us', link: 'mailto:info@jobseekerplatform.com' },
    { name: 'Privacy Policy', link: '/privacy-policy' },
    { name: 'Terms & Conditions', link: '/terms-and-conditions' }
  ];

  logOut(){
    this.couchchatbot.logout();
    this.currentUser = "";
  }
}
