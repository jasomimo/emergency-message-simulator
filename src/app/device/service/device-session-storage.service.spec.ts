import { TestBed } from '@angular/core/testing';

import { DeviceSessionStorageService } from './device-session-storage.service';
import { provideMock } from '@ems/shared/testing/utils';
import { StorageService } from '@ems/shared/service/storage.service';

describe('DeviceSessionStorageService', () => {
  let service: DeviceSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMock(StorageService),
      ]
    });
    service = TestBed.inject(DeviceSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
