import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { JobseekerNavBarComponent } from "../jobseeker-nav-bar/jobseeker-nav-bar.component";

interface Application {
  _id: string;//data type defined - interface
  _rev: string;//update the application status id rev
  data: {
    applicationFormId: string;
    userId: string;
    jobId: string;
    jobName: string;
    applicationStatus: 'favorite' | 'applied' | 'hired' | 'rejected';
  };
}

@Component({
  selector: 'app-application-view',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule, JobseekerNavBarComponent],
  providers: [HttpClientModule],
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  applications: Application[] = [];
  favorite: Application[] = [];
  applied: Application[] = [];
  hired: Application[] = [];
  rejected: Application[] = [];
  draggedApp: Application | null = null; //store panrathau drag
  currentUserId: string = "";

  constructor(private http: HttpClient, private jobService: couchchatbotService) { }

  ngOnInit() {
    this.currentUserId = this.jobService.getLoggedInUserId();
    this.fetchApplications();
  }

  fetchApplications() {
    this.jobService.getParticularUserApplications(this.currentUserId).subscribe({
      next: (response: any) => {
        console.log(response);

        response.rows.forEach((e: any) => {//rows la array athaula each index have document e la oru doc (object)
          this.jobService.getParticularJob(e.doc.data.jobId).subscribe((jobResponse) => {
            const app: Application = { // This stores the data of a application for updating   //app-variable
              _id: e.doc._id, // Id from the application view
              _rev: e.doc._rev, // rev from application view
              data: {
                ...e.doc.data, // This has exact data of application
                jobName: jobResponse.rows[0].value // jobName to display in the html
              }
            };
            this.applications.push(app);
            this.categorizeApplications();
          });
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  categorizeApplications() {//filter the application based on application status
    this.favorite = this.applications.filter(app => app.data.applicationStatus === 'favorite');
    this.applied = this.applications.filter(app => app.data.applicationStatus === 'applied');
    this.hired = this.applications.filter(app => app.data.applicationStatus === 'hired');
    this.rejected = this.applications.filter(app => app.data.applicationStatus === 'rejected');
  }

  onDragStart(app: Application): void {
    //for assigning the drag event (built in property) type to event

    console.log("drag start");

    this.draggedApp = app;

    console.log("before", this.draggedApp.data.applicationStatus);


  }

  onDragOver(event: DragEvent): void {
    console.log("drag over");
    event.preventDefault(); //prevent the default behavior for an event
  }

  onDrop(event: DragEvent, newStatus: 'favorite' | 'applied' | 'hired' | 'rejected'): void {
    console.log("drag drop");
    event.preventDefault();

    if (newStatus === 'favorite') {
      this.draggedApp = null;
        return; // Exit function without processing
    }


    if (!this.draggedApp) return;

    this.draggedApp.data.applicationStatus = newStatus;
    console.log("after", this.draggedApp.data.applicationStatus);

    this.jobService.changeJobStatus(this.draggedApp._id, this.draggedApp).subscribe({
        next: (response: any) => {
            console.log('Job status updated successfully:', response);

            this.updateLocalJob(this.draggedApp, response.rev);
            this.draggedApp = null;
        },
        error: (error) => {
            console.error('Error updating job status:', error);
        }
    });
}



  updateLocalJob(updatedJob: Application | null, revId: string) {
    if (updatedJob) {
      const index = this.applications.findIndex(app => app._id === updatedJob._id);
      if (index !== -1) {
        updatedJob._rev = revId;
        this.applications[index] = updatedJob;
        this.categorizeApplications();
      }
    } else {
      alert('No job to update');
    }
  }
}
