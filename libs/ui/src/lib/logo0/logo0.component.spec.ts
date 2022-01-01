import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logo0Component } from './logo0.component';

describe('Logo0Component', () => {
  let component: Logo0Component;
  let fixture: ComponentFixture<Logo0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Logo0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Logo0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
