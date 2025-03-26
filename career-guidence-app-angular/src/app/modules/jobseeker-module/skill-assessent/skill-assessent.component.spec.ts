import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillAssessentComponent } from './skill-assessent.component';

describe('SkillAssessentComponent', () => {
  let component: SkillAssessentComponent;
  let fixture: ComponentFixture<SkillAssessentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillAssessentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillAssessentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
