import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatByLessonGroupComponent } from './stat-by-lesson-group.component';

describe('StatByLessonComponent', () => {
  let component: StatByLessonGroupComponent;
  let fixture: ComponentFixture<StatByLessonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatByLessonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatByLessonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
