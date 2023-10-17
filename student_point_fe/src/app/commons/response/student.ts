import { BaseResponse, Subject } from "./response";

export class ScheduleDto {
    id!: string;
    subjectDto!: Subject;
    place!: string;
    note!: string;
    startTime!: Date;
    finishTime!: Date;
    lecturer!: string;
    emailLecture!: string;
}

export class ScheduleOfStudentDto {
    id!: string;
    student!: StudentDto;
    schedule!: ScheduleDto;
}

export class StudentDto {
    id!: string;
    studentCode!: string;
    fullName!: string;
    dateOfBirth!: Date;
    address!: string;
    classCode!: string;
    cpa!: number;
}

export class StudentListRes implements BaseResponse {
    message!: string;
    data!: StudentDto[];
}