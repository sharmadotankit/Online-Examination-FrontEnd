import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ParticlesModule } from 'angular-particle';
import {NgParticlesModule} from "ng-particles";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CoursesComponent } from './courses/courses.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstructionComponent } from './instruction/instruction.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AboutUsComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CoursesComponent,
    InstructionComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParticlesModule,
    NgParticlesModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
