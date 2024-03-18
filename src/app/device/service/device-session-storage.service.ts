import { Injectable } from '@angular/core';
import { IDeviceSession, IDeviceSessionStorageService } from '../model/device.model';
import { StorageService } from '@ems/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceSessionStorageService implements IDeviceSessionStorageService {

  private readonly sessionsKey = 'ems.sessions';

  constructor(private storageService: StorageService) { }

  createSession(deviceName: string, userName: string): void {
    const session: IDeviceSession = { deviceName, userName };
    this.storageService.createItem(this.sessionsKey, session);
  }

  deleteSession(deviceName: string): void {
    this.storageService.deleteItem<IDeviceSession>(
      this.sessionsKey, 
      (session) => session.deviceName === deviceName
    );
  }

  getAllSessions(): IDeviceSession[] {
      return this.storageService.getAllItems<IDeviceSession>(this.sessionsKey);
  }
}
