import { TestBed } from '@angular/core/testing';

import { DeviceStorageService } from './device-storage.service';
import { provideMock } from '@ems/shared/testing/utils';
import { StorageService } from '@ems/shared/service/storage.service';

describe('DeviceStorageService', () => {
  let service: DeviceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMock(StorageService),
      ]
    });
    service = TestBed.inject(DeviceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
