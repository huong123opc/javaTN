import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleDto } from 'src/app/commons/response/student';

@Component({
  selector: 'app-info-calender',
  templateUrl: './info-calender.component.html',
  styleUrls: ['./info-calender.component.css']
})
export class InfoCalenderComponent  implements OnInit {

  @Input() scheduleDto!: ScheduleDto;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}