import { BaseResponse } from "./response";
import { ScheduleDto } from "./student";

export class ScheduleListRes implements BaseResponse {
    message!: string;
    data!: ScheduleDto[];
}