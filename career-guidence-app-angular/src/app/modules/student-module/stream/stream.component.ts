import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavBarComponent],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.css',
  providers: [couchchatbotService, HttpClient]
})
export class StreamComponent implements OnInit {

  courses: any[] = [];

  constructor(private chatbot: couchchatbotService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.chatbot.getCourses().subscribe({
      next: (data: any) => {
        console.log("Fetched data:", data);  // Log the entire data to inspect its structure
        this.courses = data.rows.map((row: any) => row.doc);  // Ensure you're extracting the stream names
        console.log("Courses:", this.courses);  // Log the processed courses
      },
      error: (error: any) => {
        console.log("Error Fetching Courses", error);
      }
    });
  }
  

  navigateTo(stream: any) {
    console.log(stream)
    this.router.navigate([`/stream`, stream]);
  }
}
