import { TestBed, inject } from '@angular/core/testing';

import { FiwooService } from './fiwoo.service';

describe('FiwooService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiwooService]
    });
  });

  it('should be created', inject([FiwooService], (service: FiwooService) => {
    expect(service).toBeTruthy();
  }));
});
