import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover-free-courses',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './discover-free-courses.component.html',
  styleUrl: './discover-free-courses.component.css'
})
export class DiscoverFreeCoursesComponent {
  constructor() {}
  router=new Router

  navigateToFreeCourses() {
    this.router.navigate(['/free-courses']);

}
}
