import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonGroupsComponent } from './lesson-groups.component';

describe('LessonGroupsComponent', () => {
  let component: LessonGroupsComponent;
  let fixture: ComponentFixture<LessonGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
