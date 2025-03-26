import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPrepareComponent } from './interview-prepare.component';

describe('InterviewPrepareComponent', () => {
  let component: InterviewPrepareComponent;
  let fixture: ComponentFixture<InterviewPrepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewPrepareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewPrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
