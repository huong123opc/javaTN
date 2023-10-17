import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ScheduleDto } from 'src/app/commons/response/student';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ModalCreateScheduleComponent } from '../modal/schedule/modal-create-schedule/modal-create-schedule.component';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ScheduleDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ScheduleDto> | null;
}

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.css']
})
export class ScheduleManagementComponent implements OnInit {
  total = 1;
  listSchedule: ScheduleDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Mã môn học",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.subjectDto.subjectCode.localeCompare(b.subjectDto.subjectCode),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Tên môn học",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.subjectDto.name.localeCompare(b.subjectDto.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Phòng học",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.place.localeCompare(b.place),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Ngày học",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.startTime > b.startTime ? 1 : -1,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Giờ học",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.startTime > b.startTime ? 1 : -1,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Giảng viên",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.lecturer.localeCompare(b.lecturer),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Email giảng viên",
      sortOrder: null,
      sortFn: (a: ScheduleDto, b: ScheduleDto) => a.emailLecture.localeCompare(b.emailLecture),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private scheduleService: ScheduleService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListSchedule();
  }

  getListSchedule(): void {
    this.scheduleService.getSchedules().subscribe(data => {
      this.listSchedule = data.data;
      this.listOfDisplayData = this.listSchedule;
      this.loading = false;
      console.log(this.listSchedule)
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listSchedule.filter((item: ScheduleDto) => item.subjectDto.name.indexOf(this.searchValue) !== -1);
  }

  showModalCreateSchedule(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới lịch học',
      nzContent: ModalCreateScheduleComponent,
      nzWidth: 650,
      nzStyle: { top: '10px' }
    });
    modal.afterClose.subscribe(() => this.getListSchedule())
  }

  editSchedule(patientId: number): void {
    // const modal = this.modalService.create({
    //   nzTitle: 'Cập nhật bệnh nhân',
    //   nzContent: ModalUpdatePatientComponent,
    //   nzWidth: 750,
    //   nzStyle: { top: '10px' },
    //   nzComponentParams: {
    //     patientId
    //   }
    // });
    // modal.afterClose.subscribe(() => this.getListStudent())
  }
}