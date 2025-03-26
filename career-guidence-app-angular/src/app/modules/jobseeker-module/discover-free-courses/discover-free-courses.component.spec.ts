import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverFreeCoursesComponent } from './discover-free-courses.component';

describe('DiscoverFreeCoursesComponent', () => {
  let component: DiscoverFreeCoursesComponent;
  let fixture: ComponentFixture<DiscoverFreeCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverFreeCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoverFreeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
