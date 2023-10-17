import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SemesterOfStudentListRes } from 'src/app/commons/response/response';
import { StudentPointService } from 'src/app/services/student-point.service';

@Component({
  selector: 'app-student-semester-admin',
  templateUrl: './student-semester-admin.component.html',
  styleUrls: ['./student-semester-admin.component.css']
})
export class StudentSemesterAdminComponent implements OnInit {

  studentCode!: string;
  semesterOfStudentRes: SemesterOfStudentListRes = new SemesterOfStudentListRes();

  constructor(
    private studentPointService: StudentPointService,
    private notification: NzNotificationService,
    private router: Router) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.studentCode = url[url.length - 1];
    this.getData();
  }

  getData() {
    this.studentPointService.getSemesterOfStudent(this.studentCode).subscribe(data => {
      this.semesterOfStudentRes = data;
      console.log(this.semesterOfStudentRes)
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }
}
