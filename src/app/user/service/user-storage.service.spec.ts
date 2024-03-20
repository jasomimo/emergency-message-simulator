import { TestBed } from '@angular/core/testing';

import { UserStorageService } from './user-storage.service';
import { provideMock } from '@ems/shared/testing/utils';
import { StorageService } from '@ems/shared/service/storage.service';

describe('UserStorageService', () => {
    let service: UserStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMock(StorageService)],
        });
        service = TestBed.inject(UserStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
