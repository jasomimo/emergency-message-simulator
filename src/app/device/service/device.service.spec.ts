import { TestBed } from '@angular/core/testing';

import { createMock } from '@ems/shared/testing/utils';
import { DeviceStorageService } from './device-storage.service';
import { DeviceService } from './device.service';

describe('DeviceService', () => {
    let service: DeviceService;
    let mockDeviceStorageService: DeviceStorageService;

    beforeEach(() => {
        mockDeviceStorageService = createMock(DeviceStorageService);
        mockDeviceStorageService.getAllDevices = jasmine.createSpy().and.returnValue([]);

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DeviceStorageService,
                    useValue: mockDeviceStorageService,
                },
            ],
        });
        service = TestBed.inject(DeviceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
