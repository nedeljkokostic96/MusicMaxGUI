import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { LogInGuardService } from './services/log-in-guard.service';

const routes: Routes = [
{path:"" , redirectTo:"logIn", pathMatch:"full"},
{path:"logIn" , component:LogInComponent},
{path:"register", component:RegisterComponent},
{path:"landing", component:LandingComponent, canActivate:[LogInGuardService] , children:[

]},



{path:"**" , component:LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
