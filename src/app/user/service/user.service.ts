import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { IUser, IUserDevice, IUserService } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService implements IUserService {
    users$ = new BehaviorSubject<IUser[]>([]);
    mutedUsers$ = new BehaviorSubject<IUserDevice[]>([]);

    constructor(private userStorageService: UserStorageService) {
        const users = userStorageService.getAllUsers();
        this.users$.next(users);
    }

    addUser(user: IUser): void {
        this.userStorageService.createUser(user);

        const users = [...this.users$.value];
        users.push(user);

        this.users$.next(users);
    }

    muteUser(deviceName: string, userName: string): void {
        const mutedUsers = [...this.mutedUsers$.value];
        mutedUsers.push({
            deviceName,
            userName,
        });

        this.mutedUsers$.next(mutedUsers);
    }

    unMuteUser(deviceName: string, userName: string): void {
        const mutedUsers = [...this.mutedUsers$.value];
        const index = mutedUsers.findIndex((muted) => muted.deviceName === deviceName && muted.userName === userName);

        if (index === -1) {
            return;
        }

        mutedUsers.splice(index, 1);
        this.mutedUsers$.next(mutedUsers);
    }
}
