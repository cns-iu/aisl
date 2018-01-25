import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MavFieldDropzonesComponent } from './mav-field-dropzones.component';

describe('MavFieldDropzonesComponent', () => {
  let component: MavFieldDropzonesComponent;
  let fixture: ComponentFixture<MavFieldDropzonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MavFieldDropzonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MavFieldDropzonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
