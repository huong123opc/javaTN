import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCalenderComponent } from './info-calender.component';

describe('InfoCalenderComponent', () => {
  let component: InfoCalenderComponent;
  let fixture: ComponentFixture<InfoCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
