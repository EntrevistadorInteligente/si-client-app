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
import { Error404Component } from '@core/components/error-404/error-404.component';
import { Error403Component } from '@core/components/error-403/error-403.component';
import { Error500Component } from '@core/components/error-500/error-500.component';
import { RutasNoVisiblesGuard } from '@core/guards/rutas-no-visibles-guard.guard';

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
  { path: 'error-404', component: Error404Component, canActivate: [ RutasNoVisiblesGuard ] },
  { path: 'error-403', component: Error403Component, canActivate: [ RutasNoVisiblesGuard ] },
  { path: 'error-500', component: Error500Component, canActivate: [ RutasNoVisiblesGuard ] },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
