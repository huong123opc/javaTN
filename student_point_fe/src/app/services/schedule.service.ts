import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleDtoTest } from '../commons/request/schedule';
import { BaseResponse } from '../commons/response/response';
import { ScheduleListRes } from '../commons/response/schedule';
import { AuthService } from './auth.service';
import { ROOT_API } from './apis';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private baseURL = ROOT_API + "/admin/schedule";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getSchedules(): Observable<ScheduleListRes> {
        return this.httpClient.get<ScheduleListRes>(`${this.baseURL}`);
    }

    createSchedule(scheduleReq: ScheduleDtoTest): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, scheduleReq);
    }
}