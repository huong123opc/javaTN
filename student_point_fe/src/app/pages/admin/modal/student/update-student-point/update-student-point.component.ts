import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StudentGradeReq } from 'src/app/commons/request/student';
import { Semester, SubjectOfStudent } from 'src/app/commons/response/response';
import { StudentDto } from 'src/app/commons/response/student';
import { StudentPointService } from 'src/app/services/student-point.service';

@Component({
  selector: 'app-update-student-point',
  templateUrl: './update-student-point.component.html',
  styleUrls: ['./update-student-point.component.css']
})
export class UpdateStudentPointComponent implements OnInit {
  @Input() subjectOfStudent!: SubjectOfStudent;
  @Input() student!: StudentDto;
  @Input() semester!: Semester;

  studentGradeReq: StudentGradeReq = new StudentGradeReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private studentPointService: StudentPointService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      studentId: [this.student.id, [Validators.required]],
      subjectId: [this.subjectOfStudent.subject.id, [Validators.required]],
      semesterId: [this.semester.id, [Validators.required]],
      attendancePoint: [this.subjectOfStudent.attendancePoint, [Validators.required]],
      testPoint: [this.subjectOfStudent.testPoint, [Validators.required]],
      practicePoint: [this.subjectOfStudent.practicePoint, [Validators.required]],
      examPoint: [this.subjectOfStudent.examPoint, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  updatePoint(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.studentGradeReq = {
        studentId: this.validateForm.value.studentId,
        subjectId: this.validateForm.value.subjectId,
        semesterId: this.validateForm.value.semesterId,
        attendancePoint: this.validateForm.value.attendancePoint,
        testPoint: this.validateForm.value.testPoint,
        practicePoint: this.validateForm.value.practicePoint,
        examPoint: this.validateForm.value.examPoint
      }
      this.studentPointService.enterGradeForStudent(this.studentGradeReq).subscribe(data => {
        console.log(data);
        this.destroyModal();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
        );
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
