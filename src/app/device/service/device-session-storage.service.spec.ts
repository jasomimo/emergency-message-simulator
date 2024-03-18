import { TestBed } from '@angular/core/testing';

import { DeviceSessionStorageService } from './device-session-storage.service';

describe('DeviceSessionStorageService', () => {
  let service: DeviceSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
