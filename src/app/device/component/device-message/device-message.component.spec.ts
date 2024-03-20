import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { DeviceMessageComponent } from './device-message.component';

describe('DeviceMessageComponent', () => {
  let component: DeviceMessageComponent;
  let fixture: ComponentFixture<DeviceMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceMessageComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
