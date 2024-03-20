import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { STORAGE } from 'app/app.config';

describe('StorageService', () => {
  let service: StorageService;
  let mockStorage = jasmine.createSpyObj<Storage>(
    'mockStorage',
    ['clear', 'getItem', 'key', 'removeItem', 'setItem']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: STORAGE, useValue: mockStorage }
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
