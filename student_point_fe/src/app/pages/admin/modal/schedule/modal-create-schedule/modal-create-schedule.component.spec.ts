import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateScheduleComponent } from './modal-create-schedule.component';

describe('ModalCreateScheduleComponent', () => {
  let component: ModalCreateScheduleComponent;
  let fixture: ComponentFixture<ModalCreateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
