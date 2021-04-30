import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';


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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
