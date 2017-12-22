import { TestBed, inject } from '@angular/core/testing';

import { RxdbDatabaseService } from './rxdb-database.service';

describe('RxdbDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RxdbDatabaseService]
    });
  });

  it('should be created', inject([RxdbDatabaseService], (service: RxdbDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
