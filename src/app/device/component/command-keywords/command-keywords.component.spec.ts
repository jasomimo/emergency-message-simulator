import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandKeywordsComponent } from './command-keywords.component';

describe('CommandKeywordsComponent', () => {
  let component: CommandKeywordsComponent;
  let fixture: ComponentFixture<CommandKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandKeywordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
