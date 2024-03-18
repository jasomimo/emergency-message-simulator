export interface IUser {
    // TODO: add user id?
    name: string;
}

export interface IUserService {
    addUser(user: IUser): void;
}

export interface IUserStorageService {
    getAllUsers(): IUser[];
    createUser(user: IUser): void;
}