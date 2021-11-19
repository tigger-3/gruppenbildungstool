import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionScreenComponent } from './completion-screen.component';

describe('CompletionScreenComponent', () => {
  let component: CompletionScreenComponent;
  let fixture: ComponentFixture<CompletionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
