import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectReq } from '../commons/request/subject';
import { BaseResponse } from '../commons/response/response';
import { SubjectListRes } from '../commons/response/subject';
import { AuthService } from './auth.service';
import { ROOT_API } from './apis';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    private baseURL = ROOT_API + "/admin/subjects";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getSubjects(): Observable<SubjectListRes> {
        return this.httpClient.get<SubjectListRes>(`${this.baseURL}`);
    }

    createSubject(subjectReq: SubjectReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, subjectReq);
    }
}