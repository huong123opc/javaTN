export class StudentReq {
    studentCode!: string;
    fullName!: string;
    dateOfBirth!: Date;
    address!: string;
    classCode!: string;
    cpa!: number;
}

export class StudentGradeReq {
    studentId!: string;
    subjectId!: string;
    semesterId!: string;
    attendancePoint!: number;
    testPoint!: number;
    practicePoint!: number;
    examPoint!: number;
}