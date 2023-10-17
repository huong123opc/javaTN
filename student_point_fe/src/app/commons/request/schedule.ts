export class ScheduleDtoTest {
    subjectId!: string;
    place!: string;
    note!: string;
    startTime!: Date;
    finishTime!: Date;
    lecturer!: string;
    emailLecture!: string;
}

export class ScheduleReq {
    subjectId!: string;
    place!: string;
    note!: string;
    date!: Date;
    startTime!: Date;
    finishTime!: Date;
    lecturer!: string;
    emailLecture!: string;
}