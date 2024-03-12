import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLoginComponent } from '@home/home-login/home-login.component';
import { HomeSinLoginComponent } from '@home/home-sin-login/home-sin-login.component';
import { HomeComponent } from '@home/home.component';
import { LoginComponent } from '@home/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home-sin-login', component: HomeSinLoginComponent},
  {path: 'home-login', component: HomeLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
