import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGeneralComponent } from './group-general.component';

describe('GroupGeneralComponent', () => {
  let component: GroupGeneralComponent;
  let fixture: ComponentFixture<GroupGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
