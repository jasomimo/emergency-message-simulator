import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageComponent } from './alert-message.component';
import { Component, ViewChild } from '@angular/core';
import { IAlertMessage } from '@ems/message/model/message.model';

@Component({
  selector: 'ems-mock-host',
  standalone: true,
  imports: [
    AlertMessageComponent
  ],
  template: `<ems-alert-message [alertMessage]="mockAlertMessage"></ems-alert-message>`
})
export class MockHostComponent {
  mockAlertMessage: IAlertMessage = {
    deviceName: 'mock device',
    keywords: [],
    message: 'mock message',
    timestamp: 123,
    userName: 'mock suer'
  };

  @ViewChild(AlertMessageComponent)
  component: AlertMessageComponent;
}

describe('AlertMessageComponent', () => {
  let mockHostComponent: MockHostComponent;
  let mockHostFixture: ComponentFixture<MockHostComponent>;
  
  let component: AlertMessageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockHostComponent, AlertMessageComponent]
    })
    .compileComponents();
    
    mockHostFixture = TestBed.createComponent(MockHostComponent);
    mockHostComponent = mockHostFixture.componentInstance;
    mockHostFixture.detectChanges();

    component = mockHostComponent.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
