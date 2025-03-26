import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { RouterModule } from '@angular/router';
import { JobseekerNavBarComponent } from '../jobseeker-nav-bar/jobseeker-nav-bar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  // Import MatSnackBar and MatSnackBarModule


@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, JobseekerNavBarComponent, MatSnackBarModule], // Import MatSnackBarModule
  providers: [couchchatbotService, HttpClient],
  templateUrl: './mock-interview.component.html',
  styleUrls: ['./mock-interview.component.css'],
})
export class MockInterviewComponent implements OnInit {

  // Initialize or store the necessary data in array
  questions: any[] = [];
  userAnswers: string[] = [];
  answerStatus: boolean[] = []; // To track correct (true) or incorrect (false) answers

  correctAnswers: number = 0;
  totalMarks: number = 0;

  currentUser: string = "";

  constructor(private http: HttpClient, private couchchatbot: couchchatbotService, private readonly snackbar: MatSnackBar) {}

  ngOnInit() {
    // Fetching mock interview questions when the component initializes
    this.couchchatbot.getMockInterviewQuestions().subscribe({
      next: (response) => {
        // Checking if the response contains rows of data
        if (response && response.rows) {
          // Mapping the response to the question data from each row
          this.questions = response.rows.map((row: { doc: any; }) => row.doc.data);

          // // Initializing the array to store user answers
          // this.userAnswers = new Array(this.questions.length);

          // // Initializing answer status to null
          // this.answerStatus = new Array(this.questions.length).fill(null);
        }
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      }
    });

    // current logged-in user 
    this.currentUser = this.couchchatbot.getLoggedInUser() ?? "";//nullish operator
  }

  submitAnswers() {
    // Initialize correct answers and total marks
    this.correctAnswers = 0;
    this.totalMarks = 0;

    // Iterating through the questions to check answers
    this.questions.forEach((question, index) => {
      console.log(`Question: ${question.question}`);
      console.log(`User's Answer: ${this.userAnswers[index]}`);
      console.log(`Correct Answer: ${question.correctAnswer}`);

      // Checking if the user's answer matches the correct answer
      if (this.userAnswers[index] === question.correctAnswer) {
        this.answerStatus[index] = true;
        this.correctAnswers++;
        this.totalMarks += question.marks;
      } else {
        this.answerStatus[index] = false;
      }
    });

    // Logging the total correct answers and total marks
    console.log(`Total Correct Answers: ${this.correctAnswers}`);
    console.log(`Total Marks: ${this.totalMarks}`);

    // Show the result in a MatSnackBar
    this.snackbar.open(
      `You answered ${this.correctAnswers} questions correctly out of ${this.questions.length}. Total Marks: ${this.totalMarks}`,
      'Close',
      {
        duration: 5000, // Snackbar will disappear after 5 seconds
        panelClass: ['snackbar-result'] // Optional: to apply custom styling
      }
    );
  }

  resetForm() {
    // Resetting the answer status, marks, and correct answers counters
    this.answerStatus = [];
    this.totalMarks = 0;
    this.correctAnswers = 0;
  }

  logOut() {
    // Logging out the user and resetting the currentUser value
    this.couchchatbot.logout();
    this.currentUser = "";
  }
}
