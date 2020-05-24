import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTeachersComponent } from './lesson-teachers.component';

describe('LessonTeachersComponent', () => {
  let component: LessonTeachersComponent;
  let fixture: ComponentFixture<LessonTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
