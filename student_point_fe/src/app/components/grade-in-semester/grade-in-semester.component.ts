import { Router } from '@angular/router';
import { StudentGradeService } from './../../services/student-grade.service';
import { Component, OnInit } from '@angular/core';
import { SubjectOfStudentRes, SemesterOfStudentRes } from 'src/app/commons/response/response';

@Component({
  selector: 'app-grade-in-semester',
  templateUrl: './grade-in-semester.component.html',
  styleUrls: ['./grade-in-semester.component.css']
})
export class GradeInSemesterComponent implements OnInit {

  subjectOfStudentRes: SubjectOfStudentRes = new SubjectOfStudentRes();
  semesterId!: string;
  semesterOfStudentRes: SemesterOfStudentRes = new SemesterOfStudentRes();

  constructor(private studentGradeService: StudentGradeService, private router: Router) {
  }

  ngOnInit(): void {
    this.semesterId = this.router.url.split('/')[2];
    this.getSemesterOfStudent();
    this.getResultSubject();
  }

  getSemesterOfStudent() {
    this.studentGradeService.getSemesterOfStudentById(this.semesterId).subscribe(data => {
      this.semesterOfStudentRes = data;
    }, error => {
      console.log(error);
    });
  }

  getResultSubject() {
    this.studentGradeService.getSubjectInSemesterOfStudent(this.semesterId).subscribe(data => {
      this.subjectOfStudentRes = data;
    }, error => {
      console.log(error);
    })
  }
}
