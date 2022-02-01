import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToTextBufferComponent } from './form-to-text-buffer.component';

describe('FormToTextBufferComponent', () => {
  let component: FormToTextBufferComponent;
  let fixture: ComponentFixture<FormToTextBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormToTextBufferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToTextBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
