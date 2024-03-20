import { TestBed } from '@angular/core/testing';

import { DeviceLoginService } from './device-login.service';
import { createMock, provideMock } from '@ems/shared/testing/utils';
import { DeviceSessionStorageService } from './device-session-storage.service';
import { UserService } from '@ems/user/service/user.service';

describe('DeviceLoginService', () => {
    let service: DeviceLoginService;

    let mockDeviceSessionStorageService: DeviceSessionStorageService;

    beforeEach(() => {
        mockDeviceSessionStorageService = createMock(DeviceSessionStorageService);
        mockDeviceSessionStorageService.getAllSessions = jasmine.createSpy().and.returnValue([]);

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DeviceSessionStorageService,
                    useValue: mockDeviceSessionStorageService,
                },
                provideMock(UserService),
            ],
        });
        service = TestBed.inject(DeviceLoginService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
