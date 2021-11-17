import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KursScreenComponent } from './kurs-screen.component';

describe('KursScreenComponent', () => {
  let component: KursScreenComponent;
  let fixture: ComponentFixture<KursScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KursScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KursScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
