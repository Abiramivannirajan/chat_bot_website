import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-predicted-stream',
  standalone: true,
  templateUrl: './predicted-stream.component.html',
  styleUrls: ['./predicted-stream.component.css'],
  imports: [NavBarComponent]
})
export class PredictedStreamComponent {
  predictedDepartment: string = '';

  constructor(private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.predictedDepartment = params['department'] || 'Unknown';
    });
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }
}
