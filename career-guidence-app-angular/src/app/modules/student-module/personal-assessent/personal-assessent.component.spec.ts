import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAssessentComponent } from './personal-assessent.component';

describe('PersonalAssessentComponent', () => {
  let component: PersonalAssessentComponent;
  let fixture: ComponentFixture<PersonalAssessentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAssessentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalAssessentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
