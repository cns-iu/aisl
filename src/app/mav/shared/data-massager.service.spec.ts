import { TestBed, inject } from '@angular/core/testing';

import { DataMassagerService } from './data-massager.service';

describe('DataMassagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataMassagerService]
    });
  });

  it('should be created', inject([DataMassagerService], (service: DataMassagerService) => {
    expect(service).toBeTruthy();
  }));
});
