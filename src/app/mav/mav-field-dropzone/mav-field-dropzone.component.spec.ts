import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MavFieldDropzoneComponent } from './mav-field-dropzone.component';

describe('MavFieldDropzoneComponent', () => {
  let component: MavFieldDropzoneComponent;
  let fixture: ComponentFixture<MavFieldDropzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MavFieldDropzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MavFieldDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
