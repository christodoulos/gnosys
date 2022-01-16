import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthenUploadComponent } from './strengthen-upload.component';

describe('StrengthenUploadComponent', () => {
  let component: StrengthenUploadComponent;
  let fixture: ComponentFixture<StrengthenUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthenUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthenUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
