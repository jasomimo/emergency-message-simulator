import { Injectable } from '@angular/core';
import { IUser, IUserStorageService } from '../model/user.model';
import { StorageService } from '@ems/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService implements IUserStorageService {

  private readonly usersKey = 'ems.users';

  constructor(private storageService: StorageService) {}

  getAllUsers(): IUser[] {
    return this.storageService.getAllItems<IUser>(this.usersKey);
  }
  createUser(user: IUser): void {
    this.storageService.createItem(this.usersKey, user);
  }  
}
