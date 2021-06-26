import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiMappingService } from './api-mapping.service';

describe('ApiMappingService', () => {
  let service: ApiMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ApiMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
