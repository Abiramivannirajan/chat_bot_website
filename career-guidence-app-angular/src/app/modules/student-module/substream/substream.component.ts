import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";


@Component({
  selector: 'app-substreams',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  providers:[couchchatbotService],
  templateUrl: './substream.component.html',
  styleUrl: './substream.component.css'
})
export class SubstreamsComponent implements OnInit {

  substream: any[] = []; 
  streamId: string | null = "";
colleges: any;
substreamdetails: any;

  constructor(
    
    private chatbot:couchchatbotService,
    private route: ActivatedRoute, 
    private router: Router 
  ) {}

  ngOnInit(): void {

    this.streamId = this.route.snapshot.paramMap.get('id');
    console.log("stream",this.streamId);
    
    this.fetchsubstreams();
  }

  fetchsubstreams(): void {
    this.chatbot.getsubstream().subscribe({
      next: (data: any) => {
        console.log("substream data:", data);
        this.substream = data.rows
        .filter((e: any) => e.key=== this.streamId)
          .map((row: any) => {
          
            console.log("Row value:", row.value); // Debugging
            return row.doc;
          })
          this.substreamdetails=this.substream
          console.log(this.substream)
      },
      error: (error: any) => {
        console.error('Error fetching substreams:', error);
      }
    });
  }

  navigateTo(subStream: any) {
    this.router.navigate([`/substream`, subStream]);
  }
}


