import { BaseResponse } from "./response";

export class SemesterDto {
    id!: string;
    name!: string;
    year!: string;
}

export class SemesterListRes implements BaseResponse {
    message!: string;
    data!: SemesterDto[];
}