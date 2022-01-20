import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topbar0Component } from './topbar0.component';

describe('Topbar0Component', () => {
  let component: Topbar0Component;
  let fixture: ComponentFixture<Topbar0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Topbar0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Topbar0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
