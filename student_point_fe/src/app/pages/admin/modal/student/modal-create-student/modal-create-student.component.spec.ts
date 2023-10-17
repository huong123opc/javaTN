import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateStudentComponent } from './modal-create-student.component';

describe('ModalCreateStudentComponent', () => {
  let component: ModalCreateStudentComponent;
  let fixture: ComponentFixture<ModalCreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
