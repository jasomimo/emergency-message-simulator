import { Component, Input } from '@angular/core';
import { MessageComponent } from '@ems/message/component/message/message.component';
import { IMessage } from '@ems/message/model/message.model';
import { UtcDatePipe } from '@ems/shared/pipe/utc-date.pipe';

@Component({
  selector: 'ems-device-message-log',
  standalone: true,
  imports: [
    UtcDatePipe,
    MessageComponent
  ],
  templateUrl: './device-message-log.component.html',
  styleUrl: './device-message-log.component.scss'
})
export class DeviceMessageLogComponent {
  @Input({ required: true, alias: 'messages'})
  messages: IMessage[];
}
