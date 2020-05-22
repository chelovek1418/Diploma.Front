import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersUnconfirmedComponent } from './teachers-unconfirmed.component';

describe('TeachersUnconfirmedComponent', () => {
  let component: TeachersUnconfirmedComponent;
  let fixture: ComponentFixture<TeachersUnconfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersUnconfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersUnconfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
