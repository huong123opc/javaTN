import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StudentReq } from 'src/app/commons/request/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-modal-create-student',
  templateUrl: './modal-create-student.component.html',
  styleUrls: ['./modal-create-student.component.css']
})
export class ModalCreateStudentComponent implements OnInit {
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
      studentCode: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: [null, [Validators.required]],
      classCode: [null, [Validators.required]],
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
      this.studentService.createStudent(this.studentReq).subscribe(data => {
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
