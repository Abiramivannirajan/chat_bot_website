import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { JobseekerNavBarComponent } from "../jobseeker-nav-bar/jobseeker-nav-bar.component";


export interface Question {
  id: number;
  category: string;
  question: string;
}

@Component({
  selector: 'app-skill-assessent',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, RouterLink, JobseekerNavBarComponent],
  templateUrl: './skill-assessent.component.html',
  styleUrl: './skill-assessent.component.css'
})
export class SkillAssessentComponent {
 
    showPopup: boolean = false;
    popupTitle: string = 'Assessment Result';
    popupMessage: string = '';
  
    constructor(private router: Router) {}
  
    questions = [
      { id: 1, category: 'Aptitude', question: 'How would you rate your problem-solving skills in mathematics?' },
      { id: 2, category: 'IT', question: 'How proficient are you with programming languages (e.g., Python, Java)?' },
      { id: 3, category: 'Communication', question: 'How confident are you in public speaking and communication?' },
      { id: 4, category: 'HR', question: 'How well do you understand employee management and HR processes?' },
      { id: 5, category: 'Non-IT', question: 'How familiar are you with non-IT industries such as healthcare or construction?' }
    ];
  
    answers: { [key: number]: string } = {};
    predictedScore: number | null = null;
    errorMessage: string | null = null;
  
    get isScoreAvailable(): boolean {
      return this.predictedScore !== null;
    }
  
    getAnswer(level: number): string {
      return level >= 3 ? 'Yes' : 'No';
    }
  
    submitAnswers(): void {
      const userAnswers = this.questions.map(q => this.answers[q.id] || 'No');
  
      console.log("Submitting answers:", userAnswers);
  
      fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: userAnswers })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.errorMessage = data.error;
          this.predictedScore = null;
        } else {
          this.predictedScore = data.score;
          this.errorMessage = null;
  
          if (this.predictedScore !== null && this.predictedScore < 60) {
            this.popupMessage = "Assessment Complete: Your knowledge level is low. Redirecting to Interview Preparation, where you can enhance your skills, gain valuable insights, and boost your confidence for success. Keep learning and stay motivated!";
            this.showPopup = true;
            setTimeout(() => this.router.navigate(['/interview-prepare']), 5000);
          } else if (this.predictedScore !== null) {
            this.popupMessage = "Assessment Complete: Great job! Your knowledge level is impressive. Redirecting you to Job Find, where you can discover exciting career opportunities and take the next step toward your dream job. Stay confident and keep moving forward!";
            this.showPopup = true;
            setTimeout(() => this.router.navigate(['/find']), 5000);
          }
        }
      })
      .catch(error => {
        console.error("API error:", error);
        this.errorMessage = "Failed to connect to server.";
        this.predictedScore = null;
      });
    }
  
    closePopup(): void {
      if (this.predictedScore !== null && this.predictedScore < 60) {
        this.popupMessage = "Assessment Complete: Your knowledge level is low. Redirecting to Interview Preparation, where you can enhance your skills, gain valuable insights, and boost your confidence for success. Keep learning and stay motivated!";
         this.router.navigate(['/interview-prepare'])
      } else if (this.predictedScore !== null) {
        this.popupMessage = "Assessment Complete: Great job! Your knowledge level is impressive. Redirecting you to Job Find, where you can discover exciting career opportunities and take the next step toward your dream job. Stay confident and keep moving forward!";
        this.router.navigate(['/find'])
      }
      this.showPopup = false;
    }
  }
  