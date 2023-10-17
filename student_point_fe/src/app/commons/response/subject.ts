import { BaseResponse } from "./response";

export class SubjectDto {
    id!: string;
    subjectCode!: string;
    name!: string;
    credit!: number;
}

export class SubjectListRes implements BaseResponse {
    message!: string;
    data!: SubjectDto[];
}