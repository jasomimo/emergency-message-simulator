import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessageComponent } from './device-message.component';

describe('DeviceMessageComponent', () => {
  let component: DeviceMessageComponent;
  let fixture: ComponentFixture<DeviceMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceMessageComponent]
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
