import { Component } from '@angular/core';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { CommonModule } from '@angular/common';
import { JobseekerNavBarComponent } from "../jobseeker-nav-bar/jobseeker-nav-bar.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-free-courses',
  standalone: true,
  imports: [CommonModule, JobseekerNavBarComponent],
  templateUrl: './free-courses.component.html',
  styleUrl: './free-courses.component.css'
})
export class FreeCoursesComponent {

  activeIndex: number | null = null;
  showAll: boolean = false;
  visibleCount: number = 3;
  newcards: any[] = [];
  visibleCards: any[] = [];
  departments: string[] = []; 
  selectedDepartment: string | null = null;

  isModalOpen = false;
  selectedVideoLink: SafeResourceUrl | null = null;

  // Open Modal & Set Video Link



  constructor(private Couch: couchchatbotService,private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getcarddetails();
  }

  getcarddetails() {
    this.Couch.getCardDetails().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        if (response && response.rows && response.rows.length > 0) {
          this.newcards = response.rows.map((row: any) => ({
            id: row.id,
            imageUrl: row.doc?.data?.imageUrl || 'assets/default.jpg',
            title: row.doc?.data?.Title || 'No Title',
            description: row.doc?.data?.Description || 'No Description',
            duration: row.doc?.data?.Duration || 'N/A',
            department: row.doc?.data?.Department || 'General', 
            video_link:row.doc?.data?.video_link || ''
          }));

          this.updateVisibleCards();
          this.updateDepartments();
        }
      },
      error: (error) => {
        console.error('Error fetching card details:', error);
      },
    });
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
    this.selectedDepartment = this.departments[index]; 
    this.updateVisibleCards();
  }

  updateDepartments() {
    const departmentSet = new Set(this.newcards.map(card => card.department)); 
    this.departments = Array.from(departmentSet);
  }

  openModal(videoLink: string) {
    const embedUrl = this.convertToEmbedUrl(videoLink);
    this.selectedVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    this.isModalOpen = true;
  }

  // Convert YouTube Short Link to Embed Link
  convertToEmbedUrl(url: string): string {
    if (url.includes('youtu.be')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    } else if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url; // If already in embed format, return as is
  }

  // Close Modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedVideoLink = null;
  }

}
