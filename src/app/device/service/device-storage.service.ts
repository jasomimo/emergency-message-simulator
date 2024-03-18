import { Injectable } from '@angular/core';
import { IDevice, IDeviceStorageService } from '../model/device.model';
import { StorageService } from '@ems/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService implements IDeviceStorageService {

  private readonly devicesKey = 'ems.devices';

  constructor(private storageService: StorageService) {}

  createDevice(device: IDevice): void {
    this.storageService.createItem(this.devicesKey, device);
  }

  getAllDevices(): IDevice[] {
    return this.storageService.getAllItems<IDevice>(this.devicesKey);
  }
}
