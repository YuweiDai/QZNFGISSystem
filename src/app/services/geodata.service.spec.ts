import { TestBed } from '@angular/core/testing';

import { GeodataService } from './geodata.service';

describe('GeodataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeodataService = TestBed.get(GeodataService);
    expect(service).toBeTruthy();
  });
});
