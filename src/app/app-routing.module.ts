import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KursScreenComponent } from './kurs-screen/kurs-screen.component';
import { ListScreenComponent } from './list-screen/list-screen.component';
import { LoginGuard } from './login-guard/login.guard';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch: 'full'},
  {path:'login',component:LoginScreenComponent},
  {path:'list',component:ListScreenComponent,canActivate:[LoginGuard]},
  {path:'kurs/:id',component:KursScreenComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
