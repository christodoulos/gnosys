import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar0Component } from './sidebar0.component';

describe('Sidebar0Component', () => {
  let component: Sidebar0Component;
  let fixture: ComponentFixture<Sidebar0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sidebar0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sidebar0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
