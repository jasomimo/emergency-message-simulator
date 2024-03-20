import { Observable } from "rxjs";

export interface IMessage {
    deviceName: string;
    userName: string;
    message: string;
    timestamp: number;
}

export interface IAlertMessage extends IMessage {
    keywords: string[];
}

export interface IMessageService {
    getMessagesByDevice$(deviceName: string): Observable<IMessage[]>;
    addMessage(message: IMessage): void;
    keywords$: Observable<string[]>;
}

export interface IMessageStorageService {
    getAllMessages(): IMessage[];
    createMessage(message: IMessage): void;
}
