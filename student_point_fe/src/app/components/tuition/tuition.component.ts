import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SemesterOfStudentListRes } from 'src/app/commons/response/response';
import { StudentGradeService } from 'src/app/services/student-grade.service';

class TotalTuition {
  rootTuition!: number;
  exemptions!: number;
  receivable!: number;
  collected!: number;
  owed!: number;
}
@Component({
  selector: 'app-tuition',
  templateUrl: './tuition.component.html',
  styleUrls: ['./tuition.component.css']
})
export class TuitionComponent implements OnInit {

  semesterOfStudentRes: SemesterOfStudentListRes = new SemesterOfStudentListRes();

  totalTuition: TotalTuition = new TotalTuition();

  constructor(private studentGradeService: StudentGradeService, private router: Router) { }

  ngOnInit(): void {
    this.totalTuition = {
      rootTuition: 0,
      exemptions: 0,
      receivable: 0,
      collected: 0,
      owed: 0
    }
    this.getData();
  }

  getData() {
    this.studentGradeService.getSemesterOfStudent().subscribe(data => {
      this.semesterOfStudentRes = data;
      this.semesterOfStudentRes.data.forEach(e => {
        this.totalTuition.collected += e.collected;
        this.totalTuition.exemptions += e.exemptions;
        this.totalTuition.owed += e.owed;
        this.totalTuition.receivable += e.receivable;
        this.totalTuition.rootTuition += e.rootTuition;
      })
    },
      (error) => {
        console.log(error);
      })
  }

}