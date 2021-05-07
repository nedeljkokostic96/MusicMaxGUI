import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AllreadyLoggedInGuard } from './guards/allready-logged-in.guard';
import { FactsResolver } from './guards/facts.resolver';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  
  { path: 'login', component: LogInComponent ,data:{animation: 'first'}, canActivate:[AllreadyLoggedInGuard], children:[
    { path: ':succes', component: LogInComponent ,data:{animation: 'first'}}
  ]},
  { path: 'register', component: RegisterComponent, data:{animation: 'second'}, canActivate:[AllreadyLoggedInGuard] },

  
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),data:{animation: 'third'}, resolve:{factsArray:FactsResolver} ,canActivate:[LoggedInGuard]},

  {path:"error", component:NotFoundComponent},
  {path: '**', redirectTo:'/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
