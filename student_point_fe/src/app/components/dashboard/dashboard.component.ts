import { SubjectModalComponent } from './../subject-modal/subject-modal.component';
import { StudentGradeService } from './../../services/student-grade.service';
import { SubjectOfStudent, SubjectOfStudentRes } from './../../commons/response/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subjectOfStudentRes: SubjectOfStudentRes = new SubjectOfStudentRes();

  constructor(private modalService: NgbModal, private studentGradeService: StudentGradeService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.studentGradeService.getSubjectWarning().subscribe(data => {
      this.subjectOfStudentRes = data;
    }, error => {
      console.log(error);
    });
  }

  openSubjectModal(data: SubjectOfStudent) {

    const modalRef = this.modalService.open(SubjectModalComponent, {
      backdrop: false,
      size: 'xl'
    });

    console.log(data)

    modalRef.componentInstance.subjectOfStudent = data;
  }

}
