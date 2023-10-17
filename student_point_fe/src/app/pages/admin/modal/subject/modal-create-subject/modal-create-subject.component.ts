import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StudentReq } from 'src/app/commons/request/student';
import { SubjectReq } from 'src/app/commons/request/subject';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-modal-create-subject',
  templateUrl: './modal-create-subject.component.html',
  styleUrls: ['./modal-create-subject.component.css']
})
export class ModalCreateSubjectComponent implements OnInit {
  subjectReq: SubjectReq = new SubjectReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private subjectService: SubjectService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subjectCode: [null, [Validators.required]],
      name: [null, [Validators.required]],
      credit: [null, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createSubject(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.subjectReq = {
        subjectCode: this.validateForm.value.subjectCode,
        name: this.validateForm.value.name,
        credit: this.validateForm.value.credit
      }
      this.subjectService.createSubject(this.subjectReq).subscribe(data => {
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
