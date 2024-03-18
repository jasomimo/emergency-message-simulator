import { Injectable } from '@angular/core';
import { IUser } from '@ems/user/model/user.model';
import { UserService } from '@ems/user/service/user.service';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { IDeviceLoginService } from '../model/device.model';
import { DeviceSessionStorageService } from './device-session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceLoginService implements IDeviceLoginService{

  loginSessions$ = new BehaviorSubject(new Map<string, string>());

  constructor(
      private deviceSessionStorageService: DeviceSessionStorageService,
      private userService: UserService
    ) {
    const sessions = new Map<string, string>();

    deviceSessionStorageService
      .getAllSessions()
      .forEach(session => sessions.set(session.deviceName, session.userName));

    this.loginSessions$.next(sessions);
  }

  login(deviceName: string, userName: string): void {
    this.deviceSessionStorageService.createSession(deviceName, userName);

    var sessions = new Map(this.loginSessions$.value);
    sessions.set(deviceName, userName);

    this.loginSessions$.next(sessions);
  }

  logout(deviceName: string): void {
    this.deviceSessionStorageService.deleteSession(deviceName);

    var sessions = new Map(this.loginSessions$.value);
    sessions.delete(deviceName);

    this.loginSessions$.next(sessions);
  }

  getLoggedInUser$(deviceName: string): Observable<IUser | null> {
    return combineLatest([
      this.loginSessions$,
      this.userService.users$
    ]).pipe(
      map(([sessions, users]) => {
        if (!sessions.has(deviceName)) {
          return null;
        }

        const userName = sessions.get(deviceName);
        const user = users.find(u => u.name === userName);

        if (!user) {
          return null;
        }

        return user
      })
    );
  }
}
