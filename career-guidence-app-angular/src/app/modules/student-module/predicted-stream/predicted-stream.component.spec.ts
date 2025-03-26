import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictedStreamComponent } from './predicted-stream.component';

describe('PredictedStreamComponent', () => {
  let component: PredictedStreamComponent;
  let fixture: ComponentFixture<PredictedStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictedStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictedStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
