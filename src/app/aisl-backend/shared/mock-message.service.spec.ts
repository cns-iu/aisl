import { TestBed, inject } from '@angular/core/testing';

import { MockMessageService } from './mock-message.service';

describe('MockMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockMessageService]
    });
  });

  it('should be created', inject([MockMessageService], (service: MockMessageService) => {
    expect(service).toBeTruthy();
  }));
});
