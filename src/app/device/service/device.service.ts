import { Injectable } from '@angular/core';
import { DeviceStorageService } from './device-storage.service';
import { IDevice, IDeviceService } from '../model/device.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeviceService implements IDeviceService {
    devices$ = new BehaviorSubject<IDevice[]>([]);

    constructor(private deviceStorageService: DeviceStorageService) {
        const allDevices = deviceStorageService.getAllDevices();

        this.addCommandDeviceIfNotExists(allDevices);

        this.devices$.next(allDevices);
    }

    getFieldDevices$(): Observable<IDevice[]> {
        return this.devices$.pipe(map((devices) => devices.filter((device) => device.type === 'field')));
    }

    getCommandDevice$(): Observable<IDevice | undefined> {
        return this.devices$.pipe(map((devices) => devices.find((device) => device.type === 'command')));
    }

    addFieldDevice(deviceName: string) {
        const device: IDevice = {
            name: deviceName,
            type: 'field',
        };

        this.deviceStorageService.createDevice(device);

        const allDevices = [...this.devices$.value];
        allDevices.push(device);

        this.devices$.next(allDevices);
    }

    private addCommandDeviceIfNotExists(initialDevices: IDevice[]): void {
        let commandDevice: IDevice | undefined = initialDevices.find(d => d.type === 'command');

        if (commandDevice) {
            return;
        }

        commandDevice = {
            name: 'Operator',
            type: 'command'
        };

        this.deviceStorageService.createDevice(commandDevice);

        initialDevices.push(commandDevice);
    }
}
