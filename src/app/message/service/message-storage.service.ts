import { Injectable } from '@angular/core';
import { IMessage, IMessageStorageService } from '../model/message.model';
import { StorageService } from '@ems/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageStorageService implements IMessageStorageService {

  private readonly messagesKey = 'ems.messages';
  private readonly keywordsKey = 'ems.keywords';

  constructor(private storageService: StorageService) { }

  getAllMessages(): IMessage[] {
    return this.storageService.getAllItems<IMessage>(this.messagesKey);
  }

  createMessage(message: IMessage): void {
    this.storageService.createItem(this.messagesKey, message);
  }

  updateKeywords(keywords: string[]): void {
    this.storageService.setItems(this.keywordsKey, keywords);
  }

  getAllKeywords(): string[] {
    return this.storageService.getAllItems<string>(this.keywordsKey);
  }
}
