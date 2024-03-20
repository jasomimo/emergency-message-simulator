import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { provideMock } from '@ems/shared/testing/utils';
import { DeviceStorageService } from './device-storage.service';

describe('DeviceService', () => {
    let service: DeviceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMock(DeviceStorageService)],
        });
        service = TestBed.inject(DeviceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
