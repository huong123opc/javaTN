import { StudentGradeService } from './../../services/student-grade.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SemesterOfStudentListRes } from 'src/app/commons/response/response';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  semesterOfStudentRes: SemesterOfStudentListRes = new SemesterOfStudentListRes();

  constructor(private studentGradeService: StudentGradeService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.studentGradeService.getSemesterOfStudent().subscribe(data => {
      this.semesterOfStudentRes = data;
    },
      (error) => {
        console.log(error);
      })
  }

}
