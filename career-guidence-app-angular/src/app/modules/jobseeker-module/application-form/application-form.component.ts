import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { JobseekerNavBarComponent } from '../jobseeker-nav-bar/jobseeker-nav-bar.component';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JobseekerNavBarComponent],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;
  showPopup: boolean = false;
  popupTitle: string = 'Application Submitted';
  popupMessage: string = 'Application submitted successfully, we will reach out through mail!';
  showErrorPopup: boolean = false;
  errorMessage: string = '';

  constructor(private couchchatbot: couchchatbotService, private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required],
      email: ['vabi4135@gmail.com', [Validators.required, Validators.email]],
      education: ['', Validators.required],
      cv: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.patchValue({ cv: file });
      this.applicationForm.get('cv')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.applicationForm.invalid) {
      this.showErrorPopup = true;
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    const formData = new FormData();
    formData.append('name', this.applicationForm.value.name);
    formData.append('age', this.applicationForm.value.age);
    formData.append('gender', this.applicationForm.value.gender);
    formData.append('email', this.applicationForm.value.email);
    formData.append('education', this.applicationForm.value.education);
    formData.append('cv', this.applicationForm.value.cv);

    const emailData = {
      name: this.applicationForm.value.name,
      age: this.applicationForm.value.age,
      gender: this.applicationForm.value.gender,
      education: this.applicationForm.value.education,
      email: this.applicationForm.value.email
    };

    this.couchchatbot.onJobApplicationEmail(emailData).subscribe({
      next: (response) => {
        console.log("Email sent successfully:", response);
        this.showPopup = true;
        this.applicationForm.reset();
      },
      error: (error) => {
        console.error("Error sending email:", error);
        this.showErrorPopup = true;
        this.errorMessage = "Failed to submit application. Please try again.";
      }
    });
  }

  closePopup() {
    this.showPopup = false;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }
}
