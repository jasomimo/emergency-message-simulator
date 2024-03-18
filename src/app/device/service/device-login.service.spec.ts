import { TestBed } from '@angular/core/testing';

import { DeviceLoginService } from './device-login.service';

describe('DeviceLoginService', () => {
  let service: DeviceLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
