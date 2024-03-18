import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessageLogComponent } from './device-message-log.component';

describe('DeviceMessageLogComponent', () => {
  let component: DeviceMessageLogComponent;
  let fixture: ComponentFixture<DeviceMessageLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceMessageLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceMessageLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
