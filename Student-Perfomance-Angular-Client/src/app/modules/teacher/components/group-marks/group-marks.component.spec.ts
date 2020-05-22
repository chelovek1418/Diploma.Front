import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMarksComponent } from './group-marks.component';

describe('GroupMarksComponent', () => {
  let component: GroupMarksComponent;
  let fixture: ComponentFixture<GroupMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
