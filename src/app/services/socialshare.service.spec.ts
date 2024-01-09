import { TestBed } from '@angular/core/testing';

import { SocialshareService } from './socialshare.service';

describe('SocialshareService', () => {
  let service: SocialshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
