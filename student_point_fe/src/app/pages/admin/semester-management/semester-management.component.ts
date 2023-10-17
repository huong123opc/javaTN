import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { SemesterDto } from 'src/app/commons/response/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { ModalCreateSemesterComponent } from '../modal/semester/modal-create-semester/modal-create-semester.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<SemesterDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<SemesterDto> | null;
}

@Component({
  selector: 'app-semester-management',
  templateUrl: './semester-management.component.html',
  styleUrls: ['./semester-management.component.css']
})
export class SemesterManagementComponent implements OnInit {
  total = 1;
  listSemester: SemesterDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Học kỳ",
      sortOrder: null,
      sortFn: (a: SemesterDto, b: SemesterDto) => a.name.localeCompare(b.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Năm học",
      sortOrder: null,
      sortFn: (a: SemesterDto, b: SemesterDto) => a.year.localeCompare(b.year),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private semesterService: SemesterService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListSemester();
  }

  getListSemester(): void {
    this.semesterService.getSemesters().subscribe(data => {
      this.listSemester = data.data;
      this.listOfDisplayData = this.listSemester;
      this.loading = false;
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
    this.listOfDisplayData = this.listSemester.filter((item: SemesterDto) => item.name.indexOf(this.searchValue) !== -1);
  }

  showModalCreateSemester(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới học kỳ',
      nzContent: ModalCreateSemesterComponent,
      nzWidth: 650,
      nzStyle: { top: '10px' }
    });
    modal.afterClose.subscribe(() => this.getListSemester())
  }

  editSemester(patientId: number): void {
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