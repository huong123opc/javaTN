import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { SubjectDto } from 'src/app/commons/response/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { ModalCreateSubjectComponent } from '../modal/subject/modal-create-subject/modal-create-subject.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<SubjectDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<SubjectDto> | null;
}


@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.css']
})
export class SubjectManagementComponent implements OnInit {
  total = 1;
  listSubject: SubjectDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Mã học phần",
      sortOrder: null,
      sortFn: (a: SubjectDto, b: SubjectDto) => a.subjectCode.localeCompare(b.subjectCode),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Tên học phần",
      sortOrder: null,
      sortFn: (a: SubjectDto, b: SubjectDto) => a.name.localeCompare(b.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Số tín chỉ",
      sortOrder: null,
      sortFn: (a: SubjectDto, b: SubjectDto) => a.credit > b.credit ? -1 : 1,
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private subjectService: SubjectService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListSubject();
  }

  getListSubject(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.listSubject = data.data;
      this.listOfDisplayData = this.listSubject;
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
    this.listOfDisplayData = this.listSubject.filter((item: SubjectDto) => item.name.indexOf(this.searchValue) !== -1);
  }

  showModalCreateSubject(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới học phần',
      nzContent: ModalCreateSubjectComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' }
    });
    modal.afterClose.subscribe(() => this.getListSubject())
  }

  editSubject(patientId: number): void {
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