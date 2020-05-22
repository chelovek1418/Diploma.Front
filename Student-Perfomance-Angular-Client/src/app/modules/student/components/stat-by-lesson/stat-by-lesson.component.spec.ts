import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatByLessonComponent } from './stat-by-lesson.component';

describe('StatByLessonComponent', () => {
  let component: StatByLessonComponent;
  let fixture: ComponentFixture<StatByLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatByLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatByLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
