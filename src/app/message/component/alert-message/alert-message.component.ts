import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAlertMessage } from '@ems/message/model/message.model';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'ems-alert-message',
  standalone: true,
  imports: [
    MessageComponent
  ],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertMessageComponent implements OnInit {

  @Input({ required: true })
  alertMessage: IAlertMessage;

  keywords: string;

  ngOnInit(): void {
    this.keywords = this.alertMessage.keywords.join(', ');
  }
}
