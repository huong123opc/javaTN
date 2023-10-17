import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentGradeReq } from '../commons/request/student';
import { BaseResponse, SemesterOfStudentListRes, SemesterOfStudentRes, SubjectOfStudentRes } from './../commons/response/response';
import { AuthService } from './auth.service';
import { ROOT_API } from './apis';

@Injectable({
    providedIn: 'root'
})
export class StudentPointService {
    private baseURL = ROOT_API + "/admin/student-point";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getSemesterOfStudent(studentCode: string): Observable<SemesterOfStudentListRes> {
        return this.httpClient.get<SemesterOfStudentListRes>(`${this.baseURL}/semester/student-code/${studentCode}`);
    }

    getSubjectInSemesterOfStudent(semesterOfStudentId: string): Observable<SubjectOfStudentRes> {
        return this.httpClient.get<SubjectOfStudentRes>(`${this.baseURL}/subject-of-semester/${semesterOfStudentId}`);
    }

    enterGradeForStudent(studentGradeReq: StudentGradeReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, studentGradeReq);
    }

    getSemesterOfStudentById(id: string): Observable<SemesterOfStudentRes> {
        return this.httpClient.get<SemesterOfStudentRes>(`${this.baseURL}/semester/${id}`);
    }

    getSubjectInSemesterOfStudentOld(semesterOfStudentId: string): Observable<SubjectOfStudentRes> {
        return this.httpClient.get<SubjectOfStudentRes>(`${this.baseURL}/subject-in-semester/${semesterOfStudentId}`);
    }
}