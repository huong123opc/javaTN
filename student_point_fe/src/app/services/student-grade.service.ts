import { SemesterOfStudentListRes, SemesterOfStudentRes, SubjectOfStudentRes } from './../commons/response/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ROOT_API } from './apis';

@Injectable({
    providedIn: 'root'
})
export class StudentGradeService {
    private baseURL = ROOT_API;
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getSemesterOfStudent(): Observable<SemesterOfStudentListRes> {
        return this.httpClient.get<SemesterOfStudentListRes>(`${this.baseURL}/semester`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getSemesterOfStudentById(id: string): Observable<SemesterOfStudentRes> {
        return this.httpClient.get<SemesterOfStudentRes>(`${this.baseURL}/semester/${id}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getSubjectInSemesterOfStudent(semesterOfStudentId: string): Observable<SubjectOfStudentRes> {
        return this.httpClient.get<SubjectOfStudentRes>(`${this.baseURL}/subject-in-semester/${semesterOfStudentId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getSubjectWarning(): Observable<SubjectOfStudentRes> {
        return this.httpClient.get<SubjectOfStudentRes>(`${this.baseURL}/subject-warning/`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }
}