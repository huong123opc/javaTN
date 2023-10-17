import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSemesterComponent } from './modal-create-semester.component';

describe('ModalCreateSemesterComponent', () => {
  let component: ModalCreateSemesterComponent;
  let fixture: ComponentFixture<ModalCreateSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateSemesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
