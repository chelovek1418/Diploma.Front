import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadonlyJournalComponent } from './readonly-journal.component';

describe('ReadonlyJournalComponent', () => {
  let component: ReadonlyJournalComponent;
  let fixture: ComponentFixture<ReadonlyJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
