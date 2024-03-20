import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserStorageService } from './user-storage.service';
import { provideMock } from '@ems/shared/testing/utils';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMock(UserStorageService),
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
