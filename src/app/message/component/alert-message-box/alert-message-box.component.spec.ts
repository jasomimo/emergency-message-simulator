import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageBoxComponent } from './alert-message-box.component';

describe('AlertMessageComponent', () => {
  let component: AlertMessageBoxComponent;
  let fixture: ComponentFixture<AlertMessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMessageBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
