export interface IUser {
    name: string;
}

export interface IUserDevice {
    deviceName: string;
    userName: string;
}

export interface IUserService {
    addUser(user: IUser): void;
}

export interface IUserStorageService {
    getAllUsers(): IUser[];
    createUser(user: IUser): void;
}
