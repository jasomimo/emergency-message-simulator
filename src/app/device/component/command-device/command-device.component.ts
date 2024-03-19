import { Component, Input, OnInit } from '@angular/core';
import { IDevice, IDeviceComponent } from '../../model/device.model';
import { IUser } from '@ems/user/model/user.model';
import { DeviceLoginService } from '@ems/device/service/device-login.service';
import { MessageService } from '@ems/message/service/message.service';
import { Observable, take } from 'rxjs';
import { IMessage } from '@ems/message/model/message.model';
import { DeviceLoginComponent } from '../device-login/device-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DeviceMessageComponent } from '../device-message/device-message.component';
import { DeviceMessageLogComponent } from '../device-message-log/device-message-log.component';
import { CommonModule } from '@angular/common';
import { DeviceUserListComponent } from '../device-user-list/device-user-list.component';
import { CommandKeywordsComponent } from '../command-keywords/command-keywords.component';

@Component({
  selector: 'ems-command-device',
  standalone: true,
  imports: [
    CommonModule,
    DeviceLoginComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    DeviceMessageComponent,
    DeviceMessageLogComponent,
    DeviceUserListComponent,
    CommandKeywordsComponent
  ],
  templateUrl: './command-device.component.html',
  styleUrls: [
    './command-device.component.scss',
    '../../shared/_device.scss'
  ]
})
export class CommandDeviceComponent implements IDeviceComponent, OnInit {

  constructor(
    private deviceLoginService: DeviceLoginService,
    private messageService: MessageService
  ) {}

  @Input({required: true})
  device: IDevice;

  currentUser: IUser | null;

  messages$: Observable<IMessage[]>;

  ngOnInit(): void {
    this.deviceLoginService
      .getLoggedInUser$(this.device.name)
      .pipe(take(1))
      .subscribe(loggedUser => this.currentUser = loggedUser);
    
    this.messages$ = this.messageService.getMessagesByDevice$(this.device.name);
  }

  onUserLogin(user: IUser): void {
    this.deviceLoginService.login(this.device.name, user.name);

    this.currentUser = user;
  }

  onUserLogout(): void {
    this.deviceLoginService.logout(this.device.name);
    this.currentUser = null;
  }

  onSendMessage(message: string): void {
    if (!this.currentUser) {
      throw Error('Cannot send a message, there is not user logged in.');
    }

    this.messageService.addMessage({
      deviceName: this.device.name,
      message,
      timestamp: Date.now(),
      userName: this.currentUser.name
    });
  }
}
