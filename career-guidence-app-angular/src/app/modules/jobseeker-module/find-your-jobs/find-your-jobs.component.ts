import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { JobSeekerHomePageComponent } from "../jobseeker-home-page/jobseeker-home-page.component";
import { JobseekerNavBarComponent } from "../jobseeker-nav-bar/jobseeker-nav-bar.component";


@Component({
  selector: 'app-find-your-jobs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, JobSeekerHomePageComponent, JobseekerNavBarComponent],
  templateUrl: './find-your-jobs.component.html',
  styleUrls: ['./find-your-jobs.component.css'],
  providers: [HttpClient]
})
export class FindYourJobsComponent implements OnInit {

  //initialize or store the necessary data in array

  jobs: any[] = [];  
  filteredJobs: any[] = []; 
  favoriteJobIds: string[] = []; 
  jobApplicationStatus : any =[]
  applications : any = [];
  selectedLocation: string = '';  
  selectedSalaryRange: string = '';  
  selectedExperience: string = '';  
  searchTerm: string = '';  
  isLoading: boolean = true;  
  errorMessage: string = '';  

  searchbarValue : string = "";
  currentUserId : string = "";

  
  // List of districts in Tamil Nadu
  tamilNaduDistricts: string[] = [
    'Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Tirunelveli', 
    'Vellore', 'Thanjavur', 'Tiruppur', 'Erode', 'Nagapattinam', 'Dindigul', 
    'Kanyakumari', 'Karur', 'Cuddalore', 'Krishnagiri', 'Pudukkottai', 
    'Theni', 'Villupuram', 'Ramanathapuram'
  ];
  // api for storing districts dynamically in TN 'https://api.example.com/tamilnadu-districts'
  
  constructor(private couchservice: couchchatbotService, private router: Router, private http: HttpClient) {}

  
  ngOnInit(): void {
    this.fetchJobs(); // Fetch jobs from database
    this.currentUserId = this.couchservice.getLoggedInUserId();
    console.log(this.currentUserId);
    this.fetchUserApplications();
  }
  
  fetchJobs(): void {
    this.couchservice.getJobs().subscribe({
      next: (response) => {
        console.log(response);
        this.jobs = response.rows.map((row: any) =>  row.doc);   //map the response from couch(doc)
        this.filteredJobs = this.jobs; // Initialize filtered jobs
        this.isLoading = false;
        console.log(this.filteredJobs);
        
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
        this.errorMessage = 'Failed to fetch jobs. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  fetchUserApplications(): void {
    this.couchservice.getParticularUserApplications(this.currentUserId).subscribe({
      next: (response: any) => {
        console.log(response);
  
        // Reset job status mapping
        
        this.jobApplicationStatus = {}; // Store status for each job ID
  
        response.rows.forEach((row: any) => {
          const jobId = row.doc.data.jobId;
          const status = row.doc.data.applicationStatus;
  
          // Store the job application status
          this.jobApplicationStatus[jobId] = status;
  
          // If the job is marked as favorite, store separately
          if (status === 'favorite') {
            this.favoriteJobIds.push(jobId);
          }
        });
  
        console.log("Favorite Jobs:", this.favoriteJobIds);
        console.log("Job Application Status:", this.jobApplicationStatus);
      },
      error: (error) => {
        console.error('Error fetching favorite jobs:', error);
      }
    });
  }

  // Filter jobs based on location, salary range, experience, and search term
  filterJobs(): void {
    let filtered = this.jobs;

    // Apply location filter
    if (this.selectedLocation) {
      filtered = filtered.filter(job => 
        job.data.location.toLowerCase().includes(this.selectedLocation.toLowerCase())
      );
    }

    // Apply salary filter
    if (this.selectedSalaryRange) {
      filtered = filtered.filter(job => {
        const salary = parseInt(job.data.salary.replace(/[^0-9.-]+/g, ""), 10);  
        if (this.selectedSalaryRange === '20000-30000') {
          return salary >= 20000 && salary <= 30000;
        } else if (this.selectedSalaryRange === '30000-50000') {
          return salary >= 30000 && salary <= 50000;
        } else if (this.selectedSalaryRange === '50000') {
          return salary > 50000;
        }
        return true;
      });
    }

    // Apply experience filter
    if (this.selectedExperience) {
      filtered = filtered.filter(job => {
        const experience :string | number = parseInt(job.data.experience.replace(/[^0-9.-]+/g, ""), 10);
        console.log("Experinece", experience)  
        if (this.selectedExperience === '0') {
          console.log("Filterting zero....")
          return isNaN(experience); // Fresher is 0 years of experience
        } else if (this.selectedExperience === '1') {
          return experience === 1;
        } else if (this.selectedExperience === '2') {
          return experience === 2;
        } else if (this.selectedExperience === '3') {
          return experience >= 3;
        }
        return true;
      });
    }

    // Apply search term filter
    if (this.searchTerm.trim() !== '') {
      filtered = filtered.filter(job => 
        job.data.jobRole.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.data.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.data.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.data.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredJobs = filtered;  // Update the filtered jobs
  }

  // Navigate to job application form
  apply(): void {
    console.log('Applying...');
    this.router.navigate(['form']);
  }
  markFavorite(jobId: string): void {
    // Creating an object that holds the user's job application data
    const favoriteApplication = {
      userId: this.currentUserId, // Assigns the current user's ID
      jobId: jobId, // Assigns the job ID that the user wants to mark as favorite
      applicationStatus: 'favorite', // Sets the application status to 'favorite'
      type: 'application' // Indicates that this is an application type
    };
  
    // Sending the favorite application data to the backend via the couchservice
    this.couchservice.createJobApplication(favoriteApplication).subscribe({
      next: (response: any) => {
        // This block executes if the request is successful
        console.log(response); // Logs the response from the backend
        console.log("Created successfully"); // Logs a success message
        this.favoriteJobIds.push(favoriteApplication.jobId) // adding the current job to the favorite array
        this.jobApplicationStatus[favoriteApplication.jobId] = "favorite"
      },
      error: (error) => {
        
        console.log(error); 
      }
    });
  }
  
  isFavorite(jobId: string): boolean {
    // Checks if the provided job ID exists in the list of favorite job IDs
    return this.favoriteJobIds.includes(jobId); // Returns true if it's a favorite job, false otherwise
  }

  getJobStatus(jobId: string): string {
    return this.jobApplicationStatus[jobId] ?? ''; // Returns status or empty string if not found
  }
  
  searchForJob() {
    // If the search bar is empty, fetch all jobs
    if (this.searchbarValue.length == 0) {
      this.filteredJobs= this.jobs// Fetches all jobs
      return; // Exits the function early
    }
  
    // If the search bar is not empty, perform a search for jobs
    this.couchservice.searchForJob(this.searchbarValue).subscribe({
      next: (response) => {
        // This block executes if the search request is successful
        console.log(response); // Logs the response from the search request
        this.filteredJobs = response.rows.map((e: any) => e.doc); // Maps the response to a list of filtered jobs
      },
      error: (error) => {
        // This block executes if an error occurs during the search request
        console.log(error); // Logs the error to the console
      }
    });
  }
}  