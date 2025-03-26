import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindYourJobsComponent } from './find-your-jobs.component';

describe('FindYourJobsComponent', () => {
  let component: FindYourJobsComponent;
  let fixture: ComponentFixture<FindYourJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindYourJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindYourJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
