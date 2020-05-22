import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStatComponent } from './lesson-stat.component';

describe('LessonStatComponent', () => {
  let component: LessonStatComponent;
  let fixture: ComponentFixture<LessonStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
