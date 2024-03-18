import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDeviceComponent } from './field-device.component';

describe('FieldDeviceComponent', () => {
  let component: FieldDeviceComponent;
  let fixture: ComponentFixture<FieldDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
