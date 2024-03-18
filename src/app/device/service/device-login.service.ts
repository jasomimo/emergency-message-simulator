import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDeviceLoginService } from '../model/device.model';
import { DeviceSessionStorageService } from './device-session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceLoginService implements IDeviceLoginService{

  loginSessions$ = new BehaviorSubject(new Map<string, string>());

  constructor(private deviceSessionStorageService: DeviceSessionStorageService) {
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
}
