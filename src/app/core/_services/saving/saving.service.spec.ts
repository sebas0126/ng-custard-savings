import { TestBed } from '@angular/core/testing';

import { SavingService } from './saving.service';

describe('SavingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingService = TestBed.get(SavingService);
    expect(service).toBeTruthy();
  });
});
