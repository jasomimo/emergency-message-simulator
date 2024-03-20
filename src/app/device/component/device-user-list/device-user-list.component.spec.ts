import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUserListComponent } from './device-user-list.component';
import { provideMock } from '@ems/shared/testing/utils';
import { UserService } from '@ems/user/service/user.service';
import { DeviceService } from '@ems/device/service/device.service';
import { DeviceLoginService } from '@ems/device/service/device-login.service';

describe('DeviceUserListComponent', () => {
  let component: DeviceUserListComponent;
  let fixture: ComponentFixture<DeviceUserListComponent>;

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
    
    fixture = TestBed.createComponent(DeviceUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
