import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CoursesComponent } from './courses/courses.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { InstructionComponent } from './instruction/instruction.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
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
  path:"courseLink",component:CoursesComponent
},
{
  path:"instructionLink",component:InstructionComponent
},
{
  path:"takeTestLink",component:TestComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
