import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseManageComponent } from './house-manage.component';

describe('HouseManageComponent', () => {
  let component: HouseManageComponent;
  let fixture: ComponentFixture<HouseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
