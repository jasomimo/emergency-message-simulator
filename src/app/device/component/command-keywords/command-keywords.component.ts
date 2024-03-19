import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageService } from '@ems/message/service/message.service';
import { take } from 'rxjs';

@Component({
  selector: 'ems-command-keywords',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './command-keywords.component.html',
  styleUrl: './command-keywords.component.scss'
})
export class CommandKeywordsComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService
      .keywords$
      .pipe(take(1))
      .subscribe(keywords => {
        this.keywordsValue = keywords.join(', ');
      });
  }

  keywordsValue: string;

  onUpdateKeywords(): void {
    if (!this.keywordsValue) {
      this.keywordsValue = '';
    }
    
    const keywords = this.keywordsValue
      .split(',')
      .map(keyword => keyword.trim());

    this.messageService.updateKeywords(keywords);
  }
}
