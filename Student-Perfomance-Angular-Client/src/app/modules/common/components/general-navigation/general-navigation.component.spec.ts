import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNavigationComponent } from './general-navigation.component';

describe('GeneralNavigationComponent', () => {
  let component: GeneralNavigationComponent;
  let fixture: ComponentFixture<GeneralNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
