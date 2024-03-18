import { Injectable } from '@angular/core';
import { IMessage, IMessageService } from '../model/message.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MessageStorageService } from './message-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements IMessageService {
  messages$ = new BehaviorSubject<IMessage[]>([]);
  keywords$ = new BehaviorSubject<string[]>([]);

  constructor(private messageStorageService: MessageStorageService) {
    const messages = messageStorageService.getAllMessages();
    this.messages$.next(messages);
  }

  getMessagesByDevice(deviceName: string): Observable<IMessage[]> {
    return this
      .messages$
      .pipe(
        map(messages => messages.filter(
          message => message.deviceName === deviceName
        ))
      );
  }

  addMessage(message: IMessage): void {
    this.messageStorageService.createMessage(message);

    const messages = [...this.messages$.value];
    messages.push(message);

    this.messages$.next(messages);
  }
}
