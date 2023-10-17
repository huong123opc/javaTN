import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './components/calender/calender.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GradeInSemesterComponent } from './components/grade-in-semester/grade-in-semester.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SemesterComponent } from './components/semester/semester.component';
import { TuitionComponent } from './components/tuition/tuition.component';
import { ScheduleManagementComponent } from './pages/admin/schedule-management/schedule-management.component';
import { SemesterManagementComponent } from './pages/admin/semester-management/semester-management.component';
import { StudentManagementComponent } from './pages/admin/student-management/student-management.component';
import { StudentSemesterAdminComponent } from './pages/admin/student-semester-admin/student-semester-admin.component';
import { SubjectManagementComponent } from './pages/admin/subject-management/subject-management.component';
import { AuthGuard } from './services/auth.guard';
import { AdminStudentGradeSemesterComponent } from './pages/admin/admin-student-grade-semester/admin-student-grade-semester.component';

const adminRoutes: Routes = [
  { path: 'admin', component: StudentManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/students', component: StudentManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/subjects', component: SubjectManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/semesters', component: SemesterManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/schedules', component: ScheduleManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/student-semester/:id', component: StudentSemesterAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/grade-semester/:id', component: AdminStudentGradeSemesterComponent, canActivate: [AuthGuard] },
]

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'grade-semester/:id', component: GradeInSemesterComponent, canActivate: [AuthGuard] },
  { path: 'semester', component: SemesterComponent, canActivate: [AuthGuard] },
  { path: 'tuition', component: TuitionComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalenderComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '404', component: PageNotFoundComponent },
  ...adminRoutes,
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }