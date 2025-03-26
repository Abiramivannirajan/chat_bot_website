import { TestBed } from '@angular/core/testing';

import { CouchchatbotService } from './couchchatbot.service';

describe('CouchchatbotService', () => {
  let service: CouchchatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouchchatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
