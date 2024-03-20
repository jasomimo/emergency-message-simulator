import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUserListComponent } from './device-user-list.component';
import { provideMock } from '@ems/shared/testing/utils';
import { UserService } from '@ems/user/service/user.service';
import { DeviceService } from '@ems/device/service/device.service';
import { DeviceLoginService } from '@ems/device/service/device-login.service';
import { BehaviorSubject, take } from 'rxjs';
import { IDevice } from '@ems/device/model/device.model';
import { IUser, IUserDevice } from '@ems/user/model/user.model';

describe('DeviceUserListComponent', () => {
  let component: DeviceUserListComponent;
  let fixture: ComponentFixture<DeviceUserListComponent>;

  let mockDeviceService: DeviceService;
  let mockDeviceLoginService: DeviceLoginService;
  let mockUserService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceUserListComponent],
      providers: [
        provideMock(DeviceService),
        provideMock(DeviceLoginService),
        provideMock(UserService),
      ]
    })
    .compileComponents();

    mockDeviceService = TestBed.inject(DeviceService);
    mockDeviceService.devices$ = new BehaviorSubject<IDevice[]>([]);

    mockDeviceLoginService = TestBed.inject(DeviceLoginService);
    mockDeviceLoginService.loginSessions$ = new BehaviorSubject<Map<string, string>>(new Map<string, string>());

    mockUserService = TestBed.inject(UserService);
    mockUserService.users$ = new BehaviorSubject<IUser[]>([]);
    mockUserService.mutedUsers$ = new BehaviorSubject<IUserDevice[]>([]);
    
    fixture = TestBed.createComponent(DeviceUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('device-user list', () => {
    describe('field device count, no login sessions', () => {
      it('when there are no field devices, then device-user list should be empty', () => {
        mockDeviceService.devices$.next([{ name: 'command device', type: 'command' }])

        component
          .deviceUserList$
          .pipe(take(1))
          .subscribe(deviceUserList => expect(deviceUserList.length).toBe(0));
      });

      it('when there are single field device exists, then device-user list should contain one device', () => {
        mockDeviceService.devices$.next([
          { name: 'command device', type: 'command' },
          { name: 'field device', type: 'field' }
        ]);

        component
          .deviceUserList$
          .pipe(take(1))
          .subscribe(deviceUserList => {
            expect(deviceUserList.length).toBe(1);
            
            expect(deviceUserList[0].deviceName).toBe('field device');
            expect(deviceUserList[0].user).toBeFalsy();
            expect(deviceUserList[0].isUserMuted).toBeFalse();
          });
      });
    });

    describe('field device count, with logged in users', () => {
      const mockFieldDeviceName = 'device name';
      const mockUserName = 'user name';

      let mockUser: IUser;

      beforeEach(() => {
        mockDeviceService.devices$.next([
          { name: 'command device', type: 'command' },
          { name: mockFieldDeviceName, type: 'field' }
        ]);

        mockUser = { name: mockUserName };
        mockUserService.users$.next([mockUser]);

        const mockLoginSession = new Map<string, string>();
        mockLoginSession.set(mockFieldDeviceName, mockUserName);
        mockDeviceLoginService.loginSessions$.next(mockLoginSession);

        mockUserService.mutedUsers$.next([]);
      });

      it('when user is logged into field device, then device-user list should contain device name and logged in user', () => {
        component
          .deviceUserList$
          .pipe(take(1))
          .subscribe(deviceUserList => {
            expect(deviceUserList.length).toBe(1);
            
            expect(deviceUserList[0].deviceName).toBe(mockFieldDeviceName);
            expect(deviceUserList[0].user).toEqual(mockUser);
            expect(deviceUserList[0].isUserMuted).toBeFalse();
          });
      });

      it('when logged in user is muted, then device-user list should contain device name and logged in user with muted flag', () => {
        mockUserService.mutedUsers$.next([{
          deviceName: mockFieldDeviceName,
          userName: mockUser.name
        }]);

        component
          .deviceUserList$
          .pipe(take(1))
          .subscribe(deviceUserList => {
            expect(deviceUserList.length).toBe(1);
            
            expect(deviceUserList[0].deviceName).toBe(mockFieldDeviceName);
            expect(deviceUserList[0].user).toEqual(mockUser);
            expect(deviceUserList[0].isUserMuted).toBeTrue();
          });
      });
    });
  });

  describe('onMuteUser', () => {
    beforeEach(() => {
      mockUserService.muteUser = jasmine.createSpy();
    });

    it('when user is muted, then user service is called with correct arguments', () => {
      const mockDeviceName = 'mock device';
      const mockUserName = 'mock user';

      component.onMuteUser(mockDeviceName, mockUserName);

      expect(mockUserService.muteUser).toHaveBeenCalledWith(mockDeviceName, mockUserName);
    });
  });

  describe('onUnMuteUser', () => {
    beforeEach(() => {
      mockUserService.unMuteUser = jasmine.createSpy();
    });

    it('when user is un-muted, then user service is called with correct arguments', () => {
      const mockDeviceName = 'mock device';
      const mockUserName = 'mock user';

      component.onUnMuteUser(mockDeviceName, mockUserName);

      expect(mockUserService.unMuteUser).toHaveBeenCalledWith(mockDeviceName, mockUserName);
    });
  });
});
