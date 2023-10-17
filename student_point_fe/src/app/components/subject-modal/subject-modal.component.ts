import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectOfStudent, SubjectOfStudentRes } from 'src/app/commons/response/response';

@Component({
  selector: 'app-subject-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.css']
})
export class SubjectModalComponent implements OnInit{

  @Input() subjectOfStudent: SubjectOfStudent = new SubjectOfStudent();

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {
    console.log(this.subjectOfStudent)
  }

}
