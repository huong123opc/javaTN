import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StudentReq } from 'src/app/commons/request/student';
import { StudentDto } from 'src/app/commons/response/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-modal-update-student',
  templateUrl: './modal-update-student.component.html',
  styleUrls: ['./modal-update-student.component.css']
})
export class ModalUpdateStudentComponent implements OnInit {
  @Input() student!: StudentDto;

  studentReq: StudentReq = new StudentReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private studentService: StudentService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      studentCode: [this.student.studentCode, [Validators.required]],
      fullName: [this.student.fullName, [Validators.required]],
      dateOfBirth: [this.student.dateOfBirth, [Validators.required]],
      address: [this.student.address, [Validators.required]],
      classCode: [this.student.classCode, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createStudent(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.studentReq = {
        studentCode: this.validateForm.value.studentCode,
        fullName: this.validateForm.value.fullName,
        dateOfBirth: this.validateForm.value.dateOfBirth,
        address: this.validateForm.value.address,
        classCode: this.validateForm.value.classCode,
        cpa: 0
      }
      this.studentService.updateStudent(this.student.id, this.studentReq).subscribe(data => {
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
