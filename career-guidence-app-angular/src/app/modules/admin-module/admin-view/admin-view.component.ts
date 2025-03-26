import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { couchchatbotService } from '../../../services/couchchatbot.service';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  
  streamOptions: any;
  User: any;
  formVisible = false;
  coursesform = false;
  isFormsubmitted = false;
  jobform = false;
  substreamform = false;
  substream: string[] = [];
  streamNameIdMap: Map<string, string> = new Map();
  selectedStream: string = "";
  video_link:any

  newPlan = {
    _id: `pricing_2_${uuidv4()}`,
    data: {
      planName: '',
      description: '',
      price: null,
      duration: '',
      type: 'pricing'
    }
  };

  newcourses = {
    _id: `stream_2_${uuidv4()}`,
    data: {
      stream_Name: '',
      description: '',
      imageUrl: '',
      colleges: '',
      type: 'stream'
    }
  };

  newstream = {
    _id: `substream_2_${uuidv4()}`,
    data: {
      streamId: '',
      substream_Name: '',
      description: '',
      imageurl: '',
      type: 'substream',
      extraDescription: '',
      extraImageUrl: '',
      duration: ''
    }
  };

  newJob = {
    _id: `job-details_2_${uuidv4()}`,
    data: {
      companyName: '',
      location: '',
      jobRole: '',
      email: '',
      applyLink: '',
      description: '',
      experience: '',
      salary:'',
      type: 'job-details'
    }
  };

  // jobform = true;  // Controls whether the form is visible
newJobFair = {
  data: {
    jobFairID: '',
    jobFairName: '',
    organisedBy: '',
    jobFairVenue: '',
    participatingSeekers: 0,
    employerParticipation: '',
    jobSeekerParticipation: '',
    jobFairDescription: ''
  }
};

  faqService: any;
  
  constructor(private couch:couchchatbotService, private http: HttpClient,
    
private router: Router ) {}

  ngOnInit(): void {
    this.fetchUserList();
    this.fetchsubstreams();
    this.fetchcourses();
    this.fetchMockInterviewQuestions(); 
   
  }

  fetchUserList() {
    this.couch.getAllUser().subscribe({
      next: (response: any) => {
        this.User = response.rows.map((row: any) => row.doc.data);
      },
      error: (err: any) => console.error('Error fetching users:', err),
    });
  }

  fetchsubstreams(): void {
    this.couch.getCourses().subscribe({
      next: (response: any) => {
        this.streamNameIdMap.clear();
        response.rows.forEach((user: any) => {
          this.streamNameIdMap.set(user.value, user.key);
        });
      },
      error: (error: any) => console.error('Error fetching substreams:', error),
    });
  }

  fetchcourses() {
    this.couch.getCourses().subscribe({
      next: (response: any) => {
        this.substream = response.rows.map((row: any) => row);
      },
      error: (error: any) => console.error('Error fetching courses:', error),
    });
  }

  openForm(formType: string) {
    this.formVisible = this.jobform = this.coursesform = this.substreamform = false;
    if (formType === 'job') this.jobform = true;
    else if (formType === 'courses') this.coursesform = true;
    else if (formType === 'substream') this.substreamform = true;
    else if (formType === 'pricing') this.formVisible = true;
  }

  closeForm() {
    this.formVisible = this.jobform = this.coursesform = this.substreamform = false;
  }

  addCoursesAndColleges() {
    if (!this.newcourses.data.stream_Name || !this.newcourses.data.description || !this.newcourses.data.imageUrl || !this.newcourses.data.colleges) {
      alert("Please fill all fields.");
      return;
    }

    const streamData = {
      _id: `stream_2_${uuidv4()}`,
      data: { ...this.newcourses.data, createdAt: new Date().toISOString() }
    };

    this.couch.addCourses(streamData).subscribe({
      next: () => {
        alert('Course added successfully.');
        this.coursesform = false;
      },
      error: () => alert('Failed to add course.'),
    });
  }

  addSubstream() {
    if (!this.newstream.data.substream_Name || !this.newstream.data.description || !this.newstream.data.extraDescription ||
        !this.newstream.data.duration || !this.newstream.data.extraImageUrl || !this.newstream.data.imageurl) {
      alert("Please fill all fields.");
      return;
    }
  }

  addJobdetails() {
    if (!this.newJob.data.companyName || !this.newJob.data.location || !this.newJob.data.jobRole ||
        !this.newJob.data.email || !this.newJob.data.applyLink || !this.newJob.data.description || !this.newJob.data.salary
       || !this.newJob.data.experience) {
      alert("Please fill all fields.");
      return;
    }

    this.couch.addJob(this.newJob).subscribe({
      next: () => {
        alert('Job added successfully!');
        this.jobform = false;
      },
      error: () => alert('Failed to add job.'),
    });
  }
  question: string = '';
  options: string[] = ['', '', '', ''];  // Store the options
  correctAnswer: string = '';
  marks: number = 0;


  // To hold data from CouchDB (for instance, mock interview questions)
  mockInterviewQuestions: any[] = [];
 

  // Fetch the questions from CouchDB
  fetchMockInterviewQuestions(): void {
    this.couch.getMockInterviewQuestions().subscribe({
      next: (data: any) => {
        console.log('Mock interview questions:', data);
        this.mockInterviewQuestions = data.rows?.map((row: any) => row.doc.data) || [];
      },
      error: (error: any) => {
        console.error('Error fetching mock interview questions:', error);
      }
    });
  }
  
  // Method to submit a new question to CouchDB
  submit(): void {
    console.log(this.question);
    this.generateuuidque()
    
    const newQuestion = {
      _id:this.mockinterview,
      data:{
      question: this.question,
      options: this.options,
      correctAnswer: this.correctAnswer,
      marks: this.marks,
      type:"mockinterview"
      }

    };
    console.log(newQuestion)
  
    this.couch.addMockInterviewQuestion(newQuestion).subscribe({
      next: (response: any) => {
        console.log(newQuestion);
        
        alert('Question added successfully');
        
        this.resetForm();
        this.fetchMockInterviewQuestions();
      },
      error: (error: any) => {
        console.error('Error saving question:', error);
      }
    });
  }
  
  // Reset the form after submission
  resetForm(): void {
    this.question = '';
    this.options = ['', '', '', ''];
    this.correctAnswer = '';
    this.marks = 0;
  }

  // Navigate to a specific question's details
  navigateToQuestion(questionId: any): void {
    this.router.navigate([`/question/${questionId}`]);
  }
  activeIndex: number | null = null;
  showAll: boolean = false;
  imageUrl: string = '';
  title: string = '';
  description: string = '';
  duration: string = '';
  department: string = ''; // Store department input

  visibleCount: number = 3;
  cardid: string = '';
  newcards: any[] = [];
  visibleCards: any[] = [];
  departments: string[] = []; // Store unique department names
  selectedDepartment: string | null = null; // Track selected department
  mockinterview:string=''

 

  // Correct the UUID generation
  generateuuid() {
    this.cardid = `card_2_${uuidv4()}`;  // Fixed the string concatenation
  }
  generateuuidque() {
    this.mockinterview = `mockinterview_2_${uuidv4()}`;  // Fixed the string concatenation
  }

 

  updateVisibleCards() {
    if (this.selectedDepartment) {
      this.visibleCards = this.newcards.filter(card => card.department === this.selectedDepartment);
    } else {
      this.visibleCards = this.showAll ? [...this.newcards] : this.newcards.slice(0, this.visibleCount);
    }
  }

  toggleView() {
    this.showAll = !this.showAll;
    this.updateVisibleCards();
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
    this.selectedDepartment = this.departments[index]; // Get selected department
    this.updateVisibleCards(); // Update visible cards based on selection
  }

  updateDepartments() {
    const departmentSet = new Set(this.newcards.map(card => card.department)); // Extract unique departments
    this.departments = Array.from(departmentSet);
  }

  generateuuid1() {
    this.cardid = `card_2_${uuidv4()}`;
  }

  addcarddetails() {
    this.generateuuid1();
    const carddata = {
      _id: this.cardid,
      data: {
        imageUrl: this.imageUrl,
        Title: this.title,
        Description: this.description,
        Duration: this.duration,
        Department: this.department, 
        video_link:this.video_link,
        type:"carddetails",
      },
    };

    this.couch.addCardDetails(carddata).subscribe({
      next: (response) => {
        console.log(response)
        alert('Card details added successfully!');

        // Reset form inputs
        this.imageUrl = '';
        this.title = '';
        this.description = '';
        this.duration = '';
        this.department = '';
      },
      error: (error) => {
        alert('Oops! Card was not added.');
        console.error('Error adding card:', error);
      },
    });
  }
}


// // Function to handle form submission
// addJobFairDetails() {
//   console.log('Job Fair Details:', this.newJobFair.data);
//   // Add logic to save or submit the job fair details
//   this.closeForm();  // Optionally close the form after submission
// }

// // Function to close the form
// closeForm() {
//   this.jobform = false;  // Set jobform to false to hide the form
// }

