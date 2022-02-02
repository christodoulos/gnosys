import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSimpleLeftToRightComponent } from './form-simple-left-to-right.component';

describe('FormSimpleLeftToRightComponent', () => {
  let component: FormSimpleLeftToRightComponent;
  let fixture: ComponentFixture<FormSimpleLeftToRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSimpleLeftToRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSimpleLeftToRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
