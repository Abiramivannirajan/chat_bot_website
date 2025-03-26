import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerHomePageComponent } from './jobseeker-home-page.component';

describe('JobseekerHomePageComponent', () => {
  let component: JobseekerHomePageComponent;
  let fixture: ComponentFixture<JobseekerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobseekerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
