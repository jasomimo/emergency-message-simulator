import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLoginComponent } from './device-login.component';
import { provideMock } from '@ems/shared/testing/utils';
import { UserService } from '@ems/user/service/user.service';

describe('DeviceLoginComponent', () => {
  let component: DeviceLoginComponent;
  let fixture: ComponentFixture<DeviceLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceLoginComponent],
      providers: [
        provideMock(UserService)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
