import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSubjectComponent } from './modal-create-subject.component';

describe('ModalCreateSubjectComponent', () => {
  let component: ModalCreateSubjectComponent;
  let fixture: ComponentFixture<ModalCreateSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
