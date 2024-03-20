import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { createMock, provideMock } from '@ems/shared/testing/utils';
import { MessageStorageService } from './message-storage.service';

describe('MessageService', () => {
    let service: MessageService;
    let mockMessageStorageService: MessageStorageService;

    beforeEach(() => {
        mockMessageStorageService = createMock(MessageStorageService);
        mockMessageStorageService.getAllKeywords = jasmine.createSpy().and.returnValue([]);
        mockMessageStorageService.getAllMessages = jasmine.createSpy().and.returnValue([]);

        TestBed.configureTestingModule({
            providers: [{ provide: MessageStorageService, useValue: mockMessageStorageService }],
        });

        service = TestBed.inject(MessageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
