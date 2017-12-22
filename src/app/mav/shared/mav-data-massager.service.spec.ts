import { TestBed, inject } from '@angular/core/testing';

import { MavDataMassagerService } from './aisl-mav-data-massager.service';

describe('MavDataMassagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MavDataMassagerService]
    });
  });

  it('should be created', inject([MavDataMassagerService], (service: MavDataMassagerService) => {
    expect(service).toBeTruthy();
  }));
});
