import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGeneralComponent } from './teacher-general.component';

describe('TeacherGeneralComponent', () => {
  let component: TeacherGeneralComponent;
  let fixture: ComponentFixture<TeacherGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
