import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLogin0Component } from './top-login0.component';

describe('TopLogin0Component', () => {
  let component: TopLogin0Component;
  let fixture: ComponentFixture<TopLogin0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLogin0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLogin0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
