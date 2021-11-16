import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListScreenComponent } from './list-screen/list-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch: 'full'},
  {path:'login',component:LoginScreenComponent},
  {path:'list',component:ListScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
