import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SemesterOfStudentRes, Subject, SubjectOfStudent, SubjectOfStudentRes } from 'src/app/commons/response/response';
import { StudentPointService } from 'src/app/services/student-point.service';
import { UpdateStudentPointComponent } from '../modal/student/update-student-point/update-student-point.component';

@Component({
  selector: 'app-admin-student-grade-semester',
  templateUrl: './admin-student-grade-semester.component.html',
  styleUrls: ['./admin-student-grade-semester.component.css']
})
export class AdminStudentGradeSemesterComponent implements OnInit {

  subjectOfStudentRes: SubjectOfStudentRes = new SubjectOfStudentRes();
  semesterId!: string;
  semesterOfStudentRes: SemesterOfStudentRes = new SemesterOfStudentRes();

  constructor(
    private studentPointService: StudentPointService, 
    private router: Router,
    private modalService: NzModalService,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.semesterId = this.router.url.split('/')[3];
    this.getSemesterOfStudent();
    this.getResultSubject();
  }

  getSemesterOfStudent() {
    this.studentPointService.getSemesterOfStudentById(this.semesterId).subscribe(data => {
      this.semesterOfStudentRes = data;
    }, error => {
      console.log(error);
    });
  }

  getResultSubject() {
    this.studentPointService.getSubjectInSemesterOfStudentOld(this.semesterId).subscribe(data => {
      this.subjectOfStudentRes = data;
    }, error => {
      console.log(error);
    })
  }

  openModalUpdatePoint(subjectOfStudent: SubjectOfStudent): void {
    const modal = this.modalService.create({
      nzTitle: 'Nhập điểm cho sinh viên',
      nzContent: UpdateStudentPointComponent,
      nzWidth: 650,
      nzStyle: { top: '10px' }
    });
    (<UpdateStudentPointComponent>modal.componentInstance).subjectOfStudent = subjectOfStudent;
    (<UpdateStudentPointComponent>modal.componentInstance).student = this.semesterOfStudentRes.data.student;
    (<UpdateStudentPointComponent>modal.componentInstance).semester = this.semesterOfStudentRes.data.semester;
    modal.afterClose.subscribe(() => this.getResultSubject())
  }
}
