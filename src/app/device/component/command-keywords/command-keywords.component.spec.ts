import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandKeywordsComponent } from './command-keywords.component';
import { provideMock } from '@ems/shared/testing/utils';
import { MessageService } from '@ems/message/service/message.service';
import { BehaviorSubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CommandKeywordsComponent', () => {
    let component: CommandKeywordsComponent;
    let fixture: ComponentFixture<CommandKeywordsComponent>;

    let mockMessageService: MessageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommandKeywordsComponent, NoopAnimationsModule],
            providers: [provideMock(MessageService)],
        }).compileComponents();

        mockMessageService = TestBed.inject(MessageService);
        mockMessageService.keywords$ = new BehaviorSubject<string[]>([]);

        fixture = TestBed.createComponent(CommandKeywordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
