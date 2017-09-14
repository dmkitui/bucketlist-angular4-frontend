import { TestBed, inject } from '@angular/core/testing';

import { BucketlistsServiceService } from './bucketlists-service.service';

describe('BucketlistsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketlistsServiceService]
    });
  });

  it('should be created', inject([BucketlistsServiceService], (service: BucketlistsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
