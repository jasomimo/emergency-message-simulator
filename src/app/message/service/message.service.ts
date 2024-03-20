import { Injectable } from '@angular/core';
import { IAlertMessage, IMessage, IMessageService } from '../model/message.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MessageStorageService } from './message-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements IMessageService {
  messages$ = new BehaviorSubject<IMessage[]>([]);
  alertMessages$ = new BehaviorSubject<IAlertMessage[]>([]);
  keywords$ = new BehaviorSubject<string[]>([]);

  constructor(private messageStorageService: MessageStorageService) {
    const messages = messageStorageService.getAllMessages();
    this.messages$.next(messages);

    const keywords = messageStorageService.getAllKeywords();
    this.keywords$.next(keywords);

    const alertMessages = this.getInitialAlertMessages(messages, keywords);
    this.alertMessages$.next(alertMessages);
  }

  getMessagesByDevice$(deviceName: string): Observable<IMessage[]> {
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

    this.updateAlertMessages(message);
  }

  updateKeywords(keywords: string[]): void {
    this.messageStorageService.updateKeywords(keywords);

    this.keywords$.next([...keywords]);
  }

  updateAlertMessages(message: IMessage): void {
    const alertMessage = this.getAlertMessage(message, this.keywords$.value);

    if (!alertMessage) {
      return;
    }

    const alertMessages = [...this.alertMessages$.value];
    alertMessages.push(alertMessage);

    this.alertMessages$.next(alertMessages);
  }

  private getInitialAlertMessages(messages: IMessage[], keywords: string[]): IAlertMessage[] {
    const alertMessages: IAlertMessage[] = [];

    messages.forEach(message => {
      const alertMessage = this.getAlertMessage(message, keywords);
      if (alertMessage) {
        alertMessages.push(alertMessage);
      }
    });

    return alertMessages;
  }

  private getAlertMessage(message: IMessage, keywords: string[]): IAlertMessage | null {
    let alertMessage: IAlertMessage | null = null;

    const matchedKeywords: string[] = [];

    keywords.forEach(keyword => {
      if (!keyword) {
        return;
      }

      if (message.message.includes(keyword)) {
        matchedKeywords.push(keyword);
      }
    });

    if (matchedKeywords.length) {
      alertMessage = {
        ...message,
        keywords: matchedKeywords
      };
    }

    return alertMessage;
  }
}
