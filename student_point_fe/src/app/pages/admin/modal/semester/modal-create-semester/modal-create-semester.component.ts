import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SemesterReq } from 'src/app/commons/request/semester';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-modal-create-semester',
  templateUrl: './modal-create-semester.component.html',
  styleUrls: ['./modal-create-semester.component.css']
})
export class ModalCreateSemesterComponent implements OnInit {
  semesterReq: SemesterReq = new SemesterReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private semesterService: SemesterService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      year: [null, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createSemester(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.semesterReq = {
        name: this.validateForm.value.name,
        year: this.validateForm.value.year
      }
      this.semesterService.createSemester(this.semesterReq).subscribe(data => {
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
