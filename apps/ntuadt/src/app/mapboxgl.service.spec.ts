import { TestBed } from '@angular/core/testing';

import { MapboxglService } from './mapboxgl.service';

describe('MapboxglService', () => {
  let service: MapboxglService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxglService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
