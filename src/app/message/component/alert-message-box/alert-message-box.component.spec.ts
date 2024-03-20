import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageBoxComponent } from './alert-message-box.component';
import { provideMock } from '@ems/shared/testing/utils';
import { MessageService } from '@ems/message/service/message.service';

describe('AlertMessageBoxComponent', () => {
    let component: AlertMessageBoxComponent;
    let fixture: ComponentFixture<AlertMessageBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertMessageBoxComponent],
            providers: [provideMock(MessageService)],
        }).compileComponents();

        fixture = TestBed.createComponent(AlertMessageBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
