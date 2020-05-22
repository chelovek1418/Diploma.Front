import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSettingsComponent } from './lesson-settings.component';

describe('LessonSettingsComponent', () => {
  let component: LessonSettingsComponent;
  let fixture: ComponentFixture<LessonSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
