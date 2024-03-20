import { MessageService } from '@ems/message/service/message.service';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';
import { IAlertMessage } from '@ems/message/model/message.model';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

@Component({
    selector: 'ems-alert-message-box',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatDividerModule, AlertMessageComponent],
    templateUrl: './alert-message-box.component.html',
    styleUrl: './alert-message-box.component.scss',
})
export class AlertMessageBoxComponent implements OnInit {
    alertMessages$: Observable<IAlertMessage[]>;

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.alertMessages$ = this.messageService.alertMessages$;
    }
}
