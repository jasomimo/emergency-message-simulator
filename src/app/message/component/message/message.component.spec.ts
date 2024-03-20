import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { IMessage } from '@ems/message/model/message.model';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'ems-mock-host',
  standalone: true,
  imports: [
    MessageComponent
  ],
  template: `<ems-message [message]="mockMessage"></ems-message>`
})
export class MockHostComponent {
  mockMessage: IMessage = {
    deviceName: 'mock device',
    message: 'mock message',
    timestamp: 123,
    userName: 'mock suer'
  };

  @ViewChild(MessageComponent)
  component: MessageComponent;
}

describe('MessageComponent', () => {
  let mockHostComponent: MockHostComponent;
  let mockHostFixture: ComponentFixture<MockHostComponent>;
  
  let component: MessageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockHostComponent, MessageComponent]
    })
    .compileComponents();
    
    mockHostFixture = TestBed.createComponent(MockHostComponent);
    mockHostComponent = mockHostFixture.componentInstance;
    mockHostFixture.detectChanges();

    component = mockHostComponent.component;
  });

  it('should create', () => {
    expect(mockHostComponent).toBeTruthy();
  });
});
