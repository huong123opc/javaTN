import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ScheduleReq } from 'src/app/commons/request/schedule';
import { SubjectDto } from 'src/app/commons/response/subject';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-modal-create-schedule',
  templateUrl: './modal-create-schedule.component.html',
  styleUrls: ['./modal-create-schedule.component.css']
})
export class ModalCreateScheduleComponent implements OnInit {
  scheduleReq: ScheduleReq = new ScheduleReq();
  validateForm!: UntypedFormGroup;
  listSubject: SubjectDto[] = [];

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subjectId: [null, [Validators.required]],
      place: [null, [Validators.required]],
      note: [null],
      date: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      finishTime: [null, [Validators.required]],
      lecturer: [null, [Validators.required]],
      emailLecture: [null],
    });
    this.getListSubject();
  }

  destroyModal(): void {
    this.modal.close();
  }

  getListSubject(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.listSubject = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  createSchedule(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.scheduleReq = {
        subjectId: this.validateForm.value.subjectId,
        place: this.validateForm.value.place,
        note: this.validateForm.value.note,
        date: this.validateForm.value.date,
        startTime: this.validateForm.value.startTime,
        finishTime: this.validateForm.value.finishTime,
        lecturer: this.validateForm.value.lecturer,
        emailLecture: this.validateForm.value.emailLecture,
      }
      this.scheduleService.createSchedule(this.scheduleReq).subscribe(data => {
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
