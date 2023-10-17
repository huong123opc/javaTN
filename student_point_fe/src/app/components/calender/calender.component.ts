
import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {
  endOfDay,
  format,
  isSameDay,
  isSameMonth,
  startOfDay
} from 'date-fns';
import { Subject } from 'rxjs';
import { ScheduleDto } from 'src/app/commons/response/student';
import { InfoCalenderComponent } from '../info-calender/info-calender.component';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  // @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  dataFakes: ScheduleDto[] = [
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1418",
        name: "Hệ cơ sở dữ liệu đa phương tiện",
        credit: 3
      },
      startTime: new Date("2023-08-04T09:00:00"),
      finishTime: new Date("2023-08-04T11:00:00"),
      id: "SJ01",
      place: "204-A3",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Đình Hóa",
      emailLecture: "hoand@ptit.edu.vn",
    },
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1418",
        name: "Hệ cơ sở dữ liệu đa phương tiện",
        credit: 3
      },
      startTime: new Date("2023-08-04T12:00:00"),
      finishTime: new Date("2023-08-04T14:00:00"),
      id: "SJ02",
      place: "204-A3",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Đình Hóa",
      emailLecture: "hoand@ptit.edu.vn",
    },
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1405",
        name: "Các hệ thống phân tán",
        credit: 3
      },
      startTime: new Date("2023-08-07T16:00:00"),
      finishTime: new Date("2023-08-07T18:00:00"),
      id: "SJ03",
      place: "605-A2",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Xuân Anh",
      emailLecture: "anhnx@ptit.edu.vn",
    },
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1405",
        name: "Các hệ thống phân tán",
        credit: 3
      },
      startTime: new Date("2023-08-07T18:00:00"),
      finishTime: new Date("2023-08-07T20:00:00"),
      id: "SJ04",
      place: "605-A2",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Xuân Anh",
      emailLecture: "anhnx@ptit.edu.vn",
    },
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1418",
        name: "Hệ cơ sở dữ liệu đa phương tiện",
        credit: 3
      },
      startTime: new Date("2023-08-09T07:00:00"),
      finishTime: new Date("2023-08-09T09:00:00"),
      id: "SJ05",
      place: "204-A3",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Đình Hóa",
      emailLecture: "hoand@ptit.edu.vn",
    },
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1422",
        name: "Kho dữ liệu và khai phá dữ liệu",
        credit: 3
      },
      startTime: new Date("2023-08-09T14:00:00"),
      finishTime: new Date("2023-08-09T16:00:00"),
      id: "SJ06",
      place: "305-A2",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Quỳnh Chi",
      emailLecture: "chinq@ptit.edu.vn",
    },
    {
      subjectDto: {
        id: "",
        subjectCode: "INT1422",
        name: "Kho dữ liệu và khai phá dữ liệu",
        credit: 3
      },
      startTime: new Date("2023-08-09T16:00:00"),
      finishTime: new Date("2023-08-09T18:00:00"),
      id: "SJ07",
      place: "305-A2",
      note: "Chưa cập nhật",
      lecturer: "Nguyễn Quỳnh Chi",
      emailLecture: "chinq@ptit.edu.vn",
    },
  ]

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    this.dataFakes.forEach(dataFake => {
      let event: CalendarEvent = {
        id: dataFake.id,
        start: dataFake.startTime,
        end: dataFake.finishTime,
        title: format(dataFake.startTime, "HH:mm") + " - " + format(dataFake.finishTime, "HH:mm")
          + "<br>" + dataFake.subjectDto.name + " - " + dataFake.subjectDto.subjectCode
          + "<br>" + "Địa điểm: " + dataFake.place,
        color: { ...colors['red'] },
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: false,
      }
      this.events.push(event)
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event };
    const modalRef = this.modal.open(InfoCalenderComponent, {
      backdrop: false,
      size: 'lg'
    });
    let index = this.dataFakes.findIndex(e => e.id == event.id);
    modalRef.componentInstance.scheduleDto = this.dataFakes[index];
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}