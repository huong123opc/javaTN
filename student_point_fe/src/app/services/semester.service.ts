import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectReq } from '../commons/request/subject';
import { BaseResponse } from '../commons/response/response';
import { SubjectListRes } from '../commons/response/subject';
import { AuthService } from './auth.service';
import { SemesterListRes } from '../commons/response/semester';
import { SemesterReq } from '../commons/request/semester';
import { ROOT_API } from './apis';

@Injectable({
    providedIn: 'root'
})
export class SemesterService {
    private baseURL = ROOT_API + "/admin/semesters";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getSemesters(): Observable<SemesterListRes> {
        return this.httpClient.get<SemesterListRes>(`${this.baseURL}`);
    }

    createSemester(semesterReq: SemesterReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, semesterReq);
    }
}