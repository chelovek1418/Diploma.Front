import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLessonsComponent } from './teacher-lessons.component';

describe('TeacherLessonsComponent', () => {
  let component: TeacherLessonsComponent;
  let fixture: ComponentFixture<TeacherLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
