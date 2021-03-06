import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { InstructionComponent } from './instruction/instruction.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReportComponent } from './report/report.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CourseListResolverService } from './resolver/course-list-resolver-service';
import { EnrollmentListResolverService } from './resolver/enrollmentList-resolver-service';
import { questionListResoverService } from './resolver/question-list-resolver-service';
import { ResultResolverService } from './resolver/result-resolver-service';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {
    path:"", component:HomeComponent
 },
 {
  path:"aboutUsLink", component:AboutUsComponent
},
{
  path:"homeLink",component:HomeComponent
},
{
  path:"registerLink",component:RegistrationComponent
},
{
  path:"loginLink",component:LoginComponent
},
{
  path:"forgotPasswordLink",component:ForgotPasswordComponent
},
{
  path:"courseLink",
  component:CoursesComponent,
  resolve: {courseList: CourseListResolverService,
            enrollmentList: EnrollmentListResolverService}
},
{
  path:"instructionLink",component:InstructionComponent
},
{
  path:"takeTestLink",
  component:TestComponent,
  resolve:{questionList:questionListResoverService}
},
{
  path:"reportLink",
  component:ReportComponent,
  resolve:{report:ResultResolverService}
},
{
  path:"resetPasswordLInk",component:ResetPasswordComponent
}
,
{
  path:"adminDashBoardLink",component:AdminDashboardComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
