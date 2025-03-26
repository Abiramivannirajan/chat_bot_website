import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-personal-assessent',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, NavBarComponent],
  templateUrl: './personal-assessent.component.html',
  styleUrl: './personal-assessent.component.css'
})
export class PersonalAssessentComponent {

  questions: string[] = [
    "Do you enjoy working with circuits, electronic devices, and embedded systems?",
    "Are you interested in programming and software development?",
    "Do you like designing and analyzing mechanical systems like engines and robots?",
    "Are you curious about how buildings, roads, and bridges are constructed?",
    "Do you enjoy exploring artificial intelligence and machine learning?",
    "Do you have an interest in studying physics and its applications?",
    "Do you enjoy solving mathematical problems and applying them to real-world challenges?",
    "Are you passionate about literature, creative writing, or language studies?",
    "Do you like exploring human behavior and social sciences?",
    "Are you fascinated by environmental science and sustainability?",
    "Are you interested in learning about human anatomy and physiology?",
    "Do you enjoy studying biological processes and microorganisms?",
    "Are you passionate about pharmacy and drug development?",
    "Do you have an interest in healthcare and medical diagnostics?",
    "Do you want to explore the field of nutrition and dietetics?",
    "Do you enjoy creating digital graphics, animations, and visual content?",
    "Are you passionate about fashion and clothing design?",
    "Do you have an interest in interior spaces and architectural aesthetics?",
    "Do you like working with 3D modeling, product design, and prototyping?",
    "Are you fascinated by video game design and interactive media?"

  ];

  answers: string[] = new Array(20).fill(''); // Stores user responses in array
  predictedDepartment: string = '';

  constructor(private http: HttpClient, readonly predictionService : couchchatbotService,private router: Router) { }


  submitAnswers(): void {
    if (this.answers.includes('')) {
      alert("Please answer all questions.");
      return;
    }
  
    this.predictionService.predictDepartment(this.answers).subscribe({
      next: (response) => {
        this.predictedDepartment = response.department;
        alert("Predicted Department : " + this.predictedDepartment);
        this.router.navigate(['/predicted-stream'], { queryParams: { department: this.predictedDepartment, course : "course" } });
  // Correct navigation
      },
      error: (error) => {
        console.error("Error predicting department:", error);
      }
    });
  }}