import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { StudentReq } from 'src/app/commons/request/student';
import { StudentDto } from 'src/app/commons/response/student';
import { StudentService } from 'src/app/services/student.service';
import * as XLSX from 'xlsx';
import { ModalCreateStudentComponent } from '../modal/student/modal-create-student/modal-create-student.component';
import { ModalUpdateStudentComponent } from '../modal/student/modal-update-student/modal-update-student.component';

type AOA = any[][];

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<StudentDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<StudentDto> | null;
}

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  data: AOA = [[1, 2], [3, 4]];
  studentRequests: StudentReq[] = [];

  total = 1;
  listStudent: StudentDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Mã sinh viên",
      sortOrder: null,
      sortFn: (a: StudentDto, b: StudentDto) => a.studentCode.localeCompare(b.studentCode),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Họ tên",
      sortOrder: null,
      sortFn: (a: StudentDto, b: StudentDto) => a.fullName.localeCompare(b.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Ngày sinh",
      sortOrder: null,
      sortFn: (a: StudentDto, b: StudentDto) => a.dateOfBirth > b.dateOfBirth ? -1 : 1,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Lớp",
      sortOrder: null,
      sortFn: (a: StudentDto, b: StudentDto) => a.classCode.localeCompare(b.classCode),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Điểm trung bình",
      sortOrder: null,
      sortFn: (a: StudentDto, b: StudentDto) => a.cpa - b.cpa,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Địa chỉ",
      sortOrder: null,
      sortFn: (a: StudentDto, b: StudentDto) => a.address.localeCompare(b.address),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private studentService: StudentService,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListStudent();
  }

  getListStudent(): void {
    this.studentService.getStudents().subscribe(data => {
      this.listStudent = data.data;
      this.listOfDisplayData = this.listStudent;
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
    this.listOfDisplayData = this.listStudent.filter((item: StudentDto) => item.fullName.indexOf(this.searchValue) !== -1);
  }

  showModalCreateStudent(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới sinh viên',
      nzContent: ModalCreateStudentComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' }
    });
    modal.afterClose.subscribe(() => this.getListStudent())
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);

      this.data.forEach(e => {
        if (e.length > 0 && !isNaN(e[0])) {
          let studentReq: StudentReq = {
            studentCode: e[1],
            fullName: e[2] + " " + e[3],
            dateOfBirth: new Date(),
            address: "None",
            classCode: e[4],
            cpa: 0
          }
          this.studentRequests.push(studentReq);
        }
      })
    };
    reader.readAsBinaryString(target.files[0]);
  }

  createStudentWithUpload(): void {
    this.studentRequests.forEach(e => {
      this.studentService.createStudent(e).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error)
        // this.notification.create(
        //   'error',
        //   'Lỗi máy chủ',
        //   'Có lỗi xảy ra vui lòng thử lại sau'
        // );
      })
    })
    this.getListStudent();
  }

  editStudent(student: StudentDto): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật thông tin sinh viên',
      nzContent: ModalUpdateStudentComponent,
      nzWidth: 650,
      nzStyle: { top: '10px' },
      nzComponentParams: {
        student
      }
    });
    modal.afterClose.subscribe(() => this.getListStudent())
  }

  deleteStudent(student: StudentDto): void {
    this.studentService.deleteStudent(student.id).subscribe(data => {
      console.log(data);
      this.notification.create(
        'success',
        'Xóa sinh viên',
        'Đã xóa snh viên ' + student.studentCode
      );
      this.getListStudent();
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }
}