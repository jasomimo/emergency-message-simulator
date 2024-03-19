import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IDevice, IDeviceMutedUser } from '@ems/device/model/device.model';
import { DeviceLoginService } from '@ems/device/service/device-login.service';
import { DeviceService } from '@ems/device/service/device.service';
import { IUser } from '@ems/user/model/user.model';
import { UserService } from '@ems/user/service/user.service';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';



@Component({
  selector: 'ems-device-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './device-user-list.component.html',
  styleUrl: './device-user-list.component.scss'
})
export class DeviceUserListComponent implements OnInit {
  deviceUserList$: Observable<IDeviceMutedUser[]>

  constructor(
    private deviceService: DeviceService,
    private deviceLoginService: DeviceLoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.deviceUserList$ = combineLatest([
      this.deviceService.devices$,
      this.deviceLoginService.loginSessions$,
      this.userService.users$,
      this.userService.mutedUsers$
    ]).pipe(
      map(([devices, loginSessions, users, mutedUsers]) => {
        const list: IDeviceMutedUser[] = [];

        devices.forEach(device => {
          if (device.type === 'command') {
            // skip command device
            return;
          }

          const userName = loginSessions.get(device.name);
          const user = users.find(user => user.name === userName);
          const mutedUser = mutedUsers.find(user => user.name === userName);

          list.push({
            deviceName: device.name,
            user: user,
            isUserMuted: !!mutedUser
          });
        });

        return list;
      })
    );
  }

  onMuteUser(user: IUser): void {
    this.userService.muteUser(user);
  }

  onUnmuteUser(user: IUser): void {
    this.userService.unMuteUser(user);
  }
}
