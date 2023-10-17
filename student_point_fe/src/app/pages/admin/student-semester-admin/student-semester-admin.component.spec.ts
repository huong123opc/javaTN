import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSemesterAdminComponent } from './student-semester-admin.component';

describe('StudentSemesterAdminComponent', () => {
  let component: StudentSemesterAdminComponent;
  let fixture: ComponentFixture<StudentSemesterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSemesterAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSemesterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
