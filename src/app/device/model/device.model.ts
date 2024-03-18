import { Observable } from "rxjs";

export type DeviceType = 'field' | 'command';

export interface IDevice {
    // TODO: add user id?
    name: string;
    type: DeviceType;
}

export interface IDeviceStorageService {
    createDevice(device: IDevice): void;
    getAllDevices(): IDevice[];
}
 export interface IDeviceService {
    addFieldDevice(deviceName: string): void;
    getFieldDevices$(): Observable<IDevice[]>;
    getCommandDevice$(): Observable<IDevice | undefined>;
 }

export interface IDeviceComponent {

}

export interface IDeviceLoginService {
    login(deviceName: string, userName: string): void;
    logout(deviceName: string): void;
}

export interface IDeviceSession {
    deviceName: string;
    userName: string;
}

export interface IDeviceSessionStorageService {
    createSession(deviceName: string, userName: string): void;
    deleteSession(deviceName: string): void;
    getAllSessions(): IDeviceSession[];
}