import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDeviceComponent } from './command-device.component';
import { provideMock } from '@ems/shared/testing/utils';
import { MessageService } from '@ems/message/service/message.service';
import { DeviceLoginService } from '@ems/device/service/device-login.service';
import { Component, ViewChild } from '@angular/core';
import { IDevice } from '@ems/device/model/device.model';
import { of } from 'rxjs';
import { UserService } from '@ems/user/service/user.service';

@Component({
  selector: 'ems-mock-host',
  standalone: true,
  imports: [
    CommandDeviceComponent
  ],
  template: `<ems-command-device [device]="mockDevice"></ems-command-device>`
})
export class MockHostComponent {
  mockDevice: IDevice = {
    name: 'Mock Device',
    type: 'command'
  };

  @ViewChild(CommandDeviceComponent)
  component: CommandDeviceComponent;
}

describe('CommandDeviceComponent', () => {
  let mockHostFixture: ComponentFixture<MockHostComponent>;
  let mockHostComponent: MockHostComponent;

  let component: CommandDeviceComponent;

  let mockDeviceLoginService: DeviceLoginService;
  let mockMessageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockHostComponent, CommandDeviceComponent],
      providers: [
        provideMock(DeviceLoginService),
        provideMock(MessageService),
        provideMock(UserService),
      ]
    })
    .compileComponents();

    mockDeviceLoginService = TestBed.inject(DeviceLoginService);
    mockDeviceLoginService.getLoggedInUser$ = jasmine.createSpy().and.returnValue(of(null));

    mockMessageService = TestBed.inject(MessageService);
    mockMessageService.getMessagesByDevice$ = jasmine.createSpy().and.returnValue(of([]));
    
    mockHostFixture = TestBed.createComponent(MockHostComponent);
    mockHostComponent = mockHostFixture.componentInstance;
    mockHostFixture.detectChanges();

    component = mockHostComponent.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
