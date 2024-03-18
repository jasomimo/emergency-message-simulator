import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ems-device-message',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './device-message.component.html',
  styleUrl: './device-message.component.scss'
})
export class DeviceMessageComponent {
  message: string;

  @Output()
  sendMessage = new EventEmitter<string>();

  onSend(): void {
    if (!this.message) {
      return;
    }

    this.sendMessage.next(this.message);
    this.message = '';
  }
}
