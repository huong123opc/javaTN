import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgZorroAntdModule } from './ant-design/ant-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalenderComponent } from './components/calender/calender.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { GradeInSemesterComponent } from './components/grade-in-semester/grade-in-semester.component';
import { InfoCalenderComponent } from './components/info-calender/info-calender.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SemesterComponent } from './components/semester/semester.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubjectModalComponent } from './components/subject-modal/subject-modal.component';
import { TuitionComponent } from './components/tuition/tuition.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { StudentManagementComponent } from './pages/admin/student-management/student-management.component';
import { ModalCreateStudentComponent } from './pages/admin/modal/student/modal-create-student/modal-create-student.component';
import { SubjectManagementComponent } from './pages/admin/subject-management/subject-management.component';
import { ModalCreateSubjectComponent } from './pages/admin/modal/subject/modal-create-subject/modal-create-subject.component';
import { SemesterManagementComponent } from './pages/admin/semester-management/semester-management.component';
import { ModalCreateSemesterComponent } from './pages/admin/modal/semester/modal-create-semester/modal-create-semester.component';
import { ScheduleManagementComponent } from './pages/admin/schedule-management/schedule-management.component';
import { ModalCreateScheduleComponent } from './pages/admin/modal/schedule/modal-create-schedule/modal-create-schedule.component';
import { UpdateStudentPointComponent } from './pages/admin/modal/student/update-student-point/update-student-point.component';
import { StudentSemesterAdminComponent } from './pages/admin/student-semester-admin/student-semester-admin.component';
import { AdminStudentGradeSemesterComponent } from './pages/admin/admin-student-grade-semester/admin-student-grade-semester.component';
import { ModalUpdateStudentComponent } from './pages/admin/modal/student/modal-update-student/modal-update-student.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    SemesterComponent,
    GradeInSemesterComponent,
    PageNotFoundComponent,
    LoginComponent,
    SubjectModalComponent,
    TuitionComponent,
    CalenderComponent,
    InfoCalenderComponent,
    StudentManagementComponent,
    AdminSidebarComponent,
    ModalCreateStudentComponent,
    SubjectManagementComponent,
    ModalCreateSubjectComponent,
    SemesterManagementComponent,
    ModalCreateSemesterComponent,
    ScheduleManagementComponent,
    ModalCreateScheduleComponent,
    UpdateStudentPointComponent,
    StudentSemesterAdminComponent,
    AdminStudentGradeSemesterComponent,
    ModalUpdateStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    NgbModalModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgZorroAntdModule
  ],

  providers: [
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
