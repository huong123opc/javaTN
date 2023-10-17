import { StudentDto } from "./student";

export class Semester {
    id!: string;
    name!: string;
    year!: string;
}

export class SemesterOfStudent {
    id!: string;
    semester!: Semester;
    gpa!: number;
    rootTuition!: number;
    exemptions!: number;
    receivable!: number;
    collected!: number;
    owed!: number;
    student!: StudentDto;
}

export class SemesterOfStudentListRes {
    message!: string;
    data!: SemesterOfStudent[];
}

export class SemesterOfStudentRes {
    message!: string;
    data!: SemesterOfStudent;
}

export class Subject {
    id!: string;
    subjectCode!: string;
    name!: string;
    credit!: number;
}

export class SubjectOfStudent {
    id!: string;
    subject!: Subject;
    attendancePoint!: number;
    testPoint!: number;
    practicePoint!: number;
    examPoint!: number;
    finalPoint!: number;
    gpa!: number;
    letterGrade!: string;
}

export class SubjectOfStudentRes {
    message!: string;
    data!: SubjectOfStudent[];
}

export interface BaseResponse {
    message: string;
    data: Object
}