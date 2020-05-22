import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLessonsComponent } from './group-lessons.component';

describe('GroupLessonsComponent', () => {
  let component: GroupLessonsComponent;
  let fixture: ComponentFixture<GroupLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
