import { Component, Input, OnInit } from '@angular/core';
import { IDevice, IDeviceComponent } from '../../model/device.model';
import { DeviceLoginComponent } from '../device-login/device-login.component';
import { IUser } from '@ems/user/model/user.model';
import { DeviceLoginService } from '@ems/device/service/device-login.service';
import { Observable, map, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DeviceMessageComponent } from '../device-message/device-message.component';
import { MessageService } from '@ems/message/service/message.service';
import { DeviceMessageLogComponent } from '../device-message-log/device-message-log.component';
import { IMessage } from '@ems/message/model/message.model';
import { CommonModule } from '@angular/common';
import { UserService } from '@ems/user/service/user.service';


@Component({
  selector: 'ems-field-device',
  standalone: true,
  imports: [
    CommonModule,
    DeviceLoginComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    DeviceMessageComponent,
    DeviceMessageLogComponent
  ],
  templateUrl: './field-device.component.html',
  styleUrls: [
    './field-device.component.scss',
    '../../shared/_device.scss'
  ]
})
export class FieldDeviceComponent implements IDeviceComponent, OnInit {

  constructor(
    private deviceLoginService: DeviceLoginService,
    private messageService: MessageService,
    private userService: UserService,
  ) {}

  @Input({required: true})
  device: IDevice;

  currentUser: IUser | null;

  messages$: Observable<IMessage[]>;

  currentUserMuted$: Observable<boolean>;

  ngOnInit(): void {
    if (this.device.type !== 'field') {
      throw Error(`Was expecting field device, but got '${this.device.type}'.`);
    }

    this.deviceLoginService
      .getLoggedInUser$(this.device.name)
      .pipe(take(1))
      .subscribe(loggedUser => this.currentUser = loggedUser);
    
    this.messages$ = this.messageService.getMessagesByDevice$(this.device.name);

    this.currentUserMuted$ = this.userService
      .mutedUsers$
      .pipe(
        map(mutedUsers => {
          if (!this.currentUser) {
            return false;
          }
          const currentUserName = this.currentUser.name;
          const mutedUser = mutedUsers.find(
            muted => muted.deviceName === this.device.name && muted.userName === currentUserName
          );

          return !!mutedUser;
        })
      )
  }

  onUserLogin(user: IUser): void {
    this.deviceLoginService.login(this.device.name, user.name);

    this.currentUser = user;
  };

  onUserLogout(): void {
    this.deviceLoginService.logout(this.device.name);
    this.currentUser = null;
  }

  onSendMessage(message: string): void {
    if (!this.currentUser) {
      throw Error('Cannot send a message, there is no user logged in.');
    }

    this.messageService.addMessage({
      deviceName: this.device.name,
      message,
      timestamp: Date.now(),
      userName: this.currentUser.name
    });
  }
}
