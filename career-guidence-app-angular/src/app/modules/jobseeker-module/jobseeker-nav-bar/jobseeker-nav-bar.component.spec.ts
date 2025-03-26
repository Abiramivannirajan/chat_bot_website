import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerNavBarComponent } from './jobseeker-nav-bar.component';

describe('JobseekerNavBarComponent', () => {
  let component: JobseekerNavBarComponent;
  let fixture: ComponentFixture<JobseekerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobseekerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
