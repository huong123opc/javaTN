import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentReq } from '../commons/request/student';
import { BaseResponse } from '../commons/response/response';
import { StudentListRes } from '../commons/response/student';
import { ROOT_API } from './apis';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private baseURL = ROOT_API + "/admin/students";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getStudents(): Observable<StudentListRes> {
        return this.httpClient.get<StudentListRes>(`${this.baseURL}`);
    }

    createStudent(studentReq: StudentReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, studentReq);
    }

    updateStudent(studentId: string, studentReq: StudentReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${studentId}`, studentReq);
    }

    deleteStudent(studentId: string): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${studentId}`);
    }
}