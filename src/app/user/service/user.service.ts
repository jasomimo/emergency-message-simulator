import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { IUser, IUserService } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  users$ = new BehaviorSubject<IUser[]>([]);
  mutedUsers$ = new BehaviorSubject<IUser[]>([]);

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

  muteUser(user: IUser): void {
    const mutedUsers = [...this.mutedUsers$.value];
    mutedUsers.push(user);

    this.mutedUsers$.next(mutedUsers);
  }

  unMuteUser(user: IUser): void {
    const mutedUsers = [...this.mutedUsers$.value];
    const index = mutedUsers.findIndex(u => u.name === user.name);

    if (index === -1) {
      return;
    }

    mutedUsers.splice(index, 1);
    this.mutedUsers$.next(mutedUsers);
  }
}
