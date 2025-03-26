import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-trending-courses',
  standalone:true,
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule,NavBarComponent
  
],
  providers: [HttpClient], // Removed HttpClient & Router
  templateUrl: './trending-courses.component.html',
  styleUrls: ['./trending-courses.component.css']
})
export class TrendingCoursesComponent {
  courseService: any;
  constructor(private router: Router) {}

  // If Course is a class, initialize it properly
  // course: Course = { courseName: '' }; 

  searchTerm: string = '';
  courseDetails = [
    { title: 'BUSINESS', imagelocation: 'assets/bussiness.jpg', paragraph: '', button: 'INFO' },
    // { title: 'ARTIFICIAL INTELLIGENCE & MACHINE LEARNING', imagelocation: 'assets/artificial_machine.jpg', paragraph: '...', button: 'INFO' },
    { title: 'CYBER SECURITY', imagelocation: 'assets/cybersecurity.jpg', paragraph: '', button: 'INFO' },
    // { title: 'ASTROPHYSICS AND SPACE SCIENCE', imagelocation: 'assets/astrophysics.jpg', paragraph: '...', button: 'INFO' },
    { title: 'BIOTECHNOLOGY AND BIOINFORMATICS', imagelocation: 'assets/biotechnology.jpg', paragraph: '', button: 'INFO' },
    { title: 'TELEMEDICINE AND REMOTE HEALTHCARE', imagelocation: 'assets/telemedicine.jpg', paragraph: '', button: 'INFO' },
    // { title: 'FINE ARTS AND CREATIVE DESIGN', imagelocation: 'assets/arts_science.jpg', paragraph: '...', button: 'INFO' },
    { title: 'NETWORK SECURITY ARCHITECTURE', imagelocation: 'assets/networking.jpg', paragraph: '', button: 'INFO' }
  ];

  // Dynamic search value
  somevalue = '';

  // Handle button click
  apply(courseTitle: string) {

    this.router.navigate(['/more-info']);
  }

  courseFromDB: any[] = [];

  
}
