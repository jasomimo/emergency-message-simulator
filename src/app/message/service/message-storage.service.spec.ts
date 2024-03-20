import { TestBed } from '@angular/core/testing';

import { MessageStorageService } from './message-storage.service';
import { provideMock } from '@ems/shared/testing/utils';
import { StorageService } from '@ems/shared/service/storage.service';

describe('MessageStorageService', () => {
  let service: MessageStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMock(StorageService),
      ]
    });
    service = TestBed.inject(MessageStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
