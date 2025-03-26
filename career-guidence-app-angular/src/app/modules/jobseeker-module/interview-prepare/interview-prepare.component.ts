import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JobseekerNavBarComponent } from "../jobseeker-nav-bar/jobseeker-nav-bar.component";
import { NavBarComponent } from "../../student-module/nav-bar/nav-bar.component";



@Component({
  selector: 'app-interview-prepare',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, NgFor, MatCardModule, MatButtonModule, NgIf, RouterModule, HttpClientModule, JobseekerNavBarComponent, NavBarComponent],
  providers:[couchchatbotService,HttpClient], // Ensure MatTabsModule is included
  templateUrl: './interview-prepare.component.html',
  styleUrls: ['./interview-prepare.component.css']
})
export class InterviewPrepareComponent {

  constructor(readonly couchchatbot: couchchatbotService){}
   
  currentUser : string = "";
  ngOnInit(){
    this.currentUser = this.couchchatbot.getLoggedInUser() ?? "";
  }
    // Method to download content as PDF
    downloadPDF() {
      const doc = new jsPDF();
  
      // Set document font and size
      doc.setFont("helvetica");
      doc.setFontSize(12);
  
      // Title
      doc.setFontSize(16);
      doc.text("Aptitude Interview Preparation", 10, 10);
      doc.setFontSize(12);
      doc.text("Improve problem-solving skills and logical reasoning for aptitude tests.", 10, 15);
  
      // Key Topics Section
      doc.setFontSize(14);
      doc.text("Key Topics:", 10, 25);
      doc.setFontSize(12);
      const keyTopics = [
        "Numerical Ability: Percentages, Ratios, Profit & Loss, Simple & Compound Interest.",
        "Logical Reasoning: Syllogisms, Blood Relations, Coding-Decoding, Seating Arrangement.",
        "Data Interpretation: Graphs, Charts, and Table Analysis.",
        "Time Management: Shortcuts and mental math tricks to improve speed."
      ];
  
      let yPosition = 30;  // Start yPosition here
      keyTopics.forEach((topic, index) => {
        doc.text(`${index + 1}. ${topic}`, 10, yPosition);
        yPosition += 8;  // Increase this slightly for better spacing
      });
  
      // Interview Tips Section
      doc.setFontSize(14);
      doc.text("Interview Tips:", 10, yPosition + 10);
      doc.setFontSize(12);
      const interviewTips = [
        "Always explain your thought process clearly while solving problems. Employers value structured problem-solving approaches.",
        "Practice under timed conditions to simulate real test environments.",
        "Use logic and elimination strategies when faced with tricky questions.",
        "Break complex problems into smaller, manageable steps."
      ];
  
      yPosition += 20;  // Adjust yPosition after Key Topics section
      interviewTips.forEach((tip, index) => {
        doc.text(`- ${tip}`, 10, yPosition);
        yPosition += 7;
      });
  
      // Detailed Aptitude Interview Preparation Guide
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Detailed Aptitude Interview Preparation Guide", 10, 10);
  
      // Numerical Ability Section
      doc.setFontSize(12);
      doc.text("1. Numerical Ability", 10, 20);
      doc.text("Understanding the core concepts of Numerical Ability is crucial because most competitive exams and interviews focus heavily on these areas.", 10, 25);
  
      // Percentages Section
      doc.setFontSize(12);
      doc.text("Percentages:", 10, 35);
      doc.setFontSize(11);
      doc.text("Concept: A percentage expresses a number as a fraction of 100.", 10, 40);
      doc.text("Example: A product is sold for $250. If the profit is 20%, find the selling price.", 10, 45);
      doc.text("Profit = 20% of 250 = 0.20 × 250 = $50.", 10, 50);
      doc.text("Selling price = Cost price + Profit = 250 + 50 = $300.", 10, 55);
  
      // Ratios Section
      doc.setFontSize(12);
      doc.text("Ratios:", 10, 65);
      doc.setFontSize(11);
      doc.text("Concept: A ratio represents the relationship between two numbers, showing how many times the first number contains the second.", 10, 70);
      doc.text("Example: The ratio of boys to girls in a class is 3:4. If there are 60 students, how many boys are there?", 10, 75);
      doc.text("Total parts = 3 + 4 = 7. Number of boys = (3/7) × 60 = 25 boys.", 10, 80);
  
      // Profit & Loss Section
      doc.setFontSize(12);
      doc.text("Profit & Loss:", 10, 90);
      doc.setFontSize(11);
      doc.text("Concept: Profit is the amount by which the selling price exceeds the cost price.", 10, 95);
      doc.text("Example: If a shopkeeper buys an article for $500 and sells it for $600, what is the profit percentage?", 10, 100);
      doc.text("Profit Percentage = (Profit / Cost Price) × 100 = (100 / 500) × 100 = 20%.", 10, 105);
  
      // Simple & Compound Interest Section
      doc.setFontSize(12);
      doc.text("Simple & Compound Interest:", 10, 115);
      doc.setFontSize(11);
      doc.text("Simple Interest Formula: SI = (P × R × T) / 100", 10, 120);
      doc.text("Example: $1000 invested at 5% annual interest for 3 years gives SI = $150.", 10, 125);
      doc.text("Compound Interest Formula: CI = P × (1 + R/100)^T - P", 10, 130);
  
      // Logical Reasoning Section
      doc.setFontSize(14);
      doc.text("2. Logical Reasoning", 10, 140);
      doc.setFontSize(12);
      doc.text("Syllogisms:", 10, 150);
      doc.setFontSize(11);
      doc.text("Concept: Deductive reasoning problems that involve drawing conclusions from given premises.", 10, 155);
      doc.text('Example: "All dogs are animals. All animals are living beings. Therefore, all dogs are living beings."', 10, 160);
      doc.text("Shortcuts: Use Venn diagrams to analyze logical relationships.", 10, 165);
  
      doc.text("Blood Relations:", 10, 175);
      doc.text("Concept: Identifying relationships between family members.", 10, 180);
      doc.text("Example: If A is the brother of B and B is the mother of C, A is the uncle of C.", 10, 185);
      doc.text("Shortcuts: Draw a family tree to simplify relationships.", 10, 190);
  
      doc.text("Coding-Decoding:", 10, 200);
      doc.text("Concept: Deciphering messages based on patterns.", 10, 205);
      doc.text('Example: If "CAT" is written as "DBU", what is the code for "DOG"? The code is "EPH".', 10, 210);
  
      doc.text("Seating Arrangement:", 10, 220);
      doc.text("Concept: Arranging people in a circle or line based on given conditions.", 10, 225);
      doc.text("Shortcuts: Use diagrams to visually organize the arrangement.", 10, 230);
  
      // Data Interpretation Section
      doc.setFontSize(14);
      doc.text("3. Data Interpretation", 10, 240);
      doc.setFontSize(12);
      doc.text("Analyzing data from pie charts, bar graphs, line graphs, and tables.", 10, 250);
      doc.text("Example: If a company’s market share is represented by a pie chart, calculate the competitor’s share using the given angles.", 10, 255);
  
      // Time Management Section
      doc.setFontSize(14);
      doc.text("4. Time Management Tips", 10, 265);
      doc.setFontSize(12);
      const timeManagementTips = [
        "Mental Math: Learn shortcuts for quick calculations.",
        "Practice Speed: Set time limits and gradually reduce them.",
        "Set a Target: Solve 10 questions in 15 minutes and improve over time.",
        "Focus on Accuracy First: Speed is important, but correctness matters more."
      ];
  
      yPosition = 275;  // Adjust yPosition to start after the previous content
      timeManagementTips.forEach((tip, index) => {
        doc.text(`${index + 1}. ${tip}`, 10, yPosition);
        yPosition += 7;
      });
  
      // Interview Preparation Tips Section
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Interview Preparation Tips:", 10, 10);
      doc.setFontSize(12);
      const prepTips = [
        "Communication is Key: Always explain your thought process.",
        "Mock Interviews: Simulate real interview environments.",
        "Stay Calm: Break down tough questions logically.",
        "Be Open to Learning: Even if you don’t know the answer, explaining your approach leaves a good impression."
      ];
  
      yPosition = 20;  // Start yPosition for this new page
      prepTips.forEach((tip, index) => {
        doc.text(`${index + 1}. ${tip}`, 10, yPosition);
        yPosition += 7;
      });
  
      // Additional Resources Section
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Additional Resources:", 10, 10);
      doc.setFontSize(12);
      const resources = [
        "Websites & Apps: Khan Academy, PrepInsta, Indiabix.",
        "Books: 'How to Prepare for Quantitative Aptitude for the CAT' by Arun Sharma."
      ];
  
      yPosition = 20;  // Start yPosition for this page
      resources.forEach((resource, index) => {
        doc.text(`${index + 1}. ${resource}`, 10, yPosition);
        yPosition += 7;
      });
  
      // Saving the PDF
      doc.save('aptitude-preparation-guide.pdf');
    }

    logOut(){
      this.couchchatbot.logout();
      this.currentUser = "";
    }
  }
  

