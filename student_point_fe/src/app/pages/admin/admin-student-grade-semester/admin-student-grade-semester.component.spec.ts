import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentGradeSemesterComponent } from './admin-student-grade-semester.component';

describe('AdminStudentGradeSemesterComponent', () => {
  let component: AdminStudentGradeSemesterComponent;
  let fixture: ComponentFixture<AdminStudentGradeSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentGradeSemesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentGradeSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
