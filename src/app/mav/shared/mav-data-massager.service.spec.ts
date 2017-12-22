import { TestBed, inject } from '@angular/core/testing';

import { AislMavDataMassagerService } from '../../aisl-mav/shared/aisl-mav-data-massager.service';

describe('MavDataMassagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AislMavDataMassagerService]
    });
  });

  it('should be created', inject([AislMavDataMassagerService], (service: AislMavDataMassagerService) => {
    expect(service).toBeTruthy();
  }));
});
