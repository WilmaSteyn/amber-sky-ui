import { TestBed } from '@angular/core/testing';

import { SpecialGalleryDataService } from './special-gallery-data.service';

describe('SpecialGalleryDataService', () => {
  let service: SpecialGalleryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialGalleryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
