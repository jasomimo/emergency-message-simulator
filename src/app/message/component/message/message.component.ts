import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMessage } from '@ems/message/model/message.model';
import { UtcDatePipe } from '@ems/shared/pipe/utc-date.pipe';

@Component({
  selector: 'ems-message',
  standalone: true,
  imports: [UtcDatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  @Input({ required: true })
  message: IMessage
}
