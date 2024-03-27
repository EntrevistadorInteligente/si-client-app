// MODULOS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES
import { LoginComponent } from '@core/components/login/login.component';
import { PerfilComponent } from '@core/components/perfil/perfil.component';
import { RegistroComponent } from '@core/components/registro/registro.component';
import { LandingComponent } from './landing/landing.component';
import { HomeLoginComponent } from './landing/home-login/home-login.component';
import { HomeComponent } from './landing/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'inicio', component: HomeLoginComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
