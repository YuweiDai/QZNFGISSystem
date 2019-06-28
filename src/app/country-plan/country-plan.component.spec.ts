import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPlanComponent } from './country-plan.component';

describe('CountryPlanComponent', () => {
  let component: CountryPlanComponent;
  let fixture: ComponentFixture<CountryPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
