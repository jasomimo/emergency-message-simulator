import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDeviceComponent } from './field-device.component';
import { provideMock } from '@ems/shared/testing/utils';
import { MessageService } from '@ems/message/service/message.service';
import { DeviceLoginService } from '@ems/device/service/device-login.service';
import { UserService } from '@ems/user/service/user.service';
import { BehaviorSubject, of } from 'rxjs';
import { IUserDevice } from '@ems/user/model/user.model';
import { Component, ViewChild } from '@angular/core';
import { IDevice } from '@ems/device/model/device.model';

@Component({
  selector: 'ems-mock-host',
  standalone: true,
  imports: [
    FieldDeviceComponent
  ],
  template: `<ems-field-device [device]="mockDevice"></ems-field-device>`
})
export class MockHostComponent {
  mockDevice: IDevice = {
    name: 'Mock Device',
    type: 'field'
  };

  @ViewChild(FieldDeviceComponent)
  component: FieldDeviceComponent;
}

describe('FieldDeviceComponent', () => {
  let mockHostFixture: ComponentFixture<MockHostComponent>;
  let mockHostComponent: MockHostComponent;

  let component: FieldDeviceComponent;

  let mockMessageService: MessageService;
  let mockDeviceLoginService: DeviceLoginService;
  let mockUserService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockHostComponent,
        FieldDeviceComponent
      ],
      providers: [
        provideMock(MessageService),
        provideMock(DeviceLoginService),
        provideMock(UserService),
      ]
    })
    .compileComponents();

    mockMessageService = TestBed.inject(MessageService);
    mockMessageService.getMessagesByDevice$ = jasmine.createSpy().and.returnValue(of([]));

    mockDeviceLoginService = TestBed.inject(DeviceLoginService);
    mockDeviceLoginService.getLoggedInUser$ = jasmine.createSpy().and.returnValue(of(null));

    mockUserService = TestBed.inject(UserService);
    mockUserService.mutedUsers$ = new BehaviorSubject<IUserDevice[]>([]);
    
    mockHostFixture = TestBed.createComponent(MockHostComponent);
    mockHostComponent = mockHostFixture.componentInstance;
    
    mockHostFixture.detectChanges();

    component = mockHostComponent.component
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
