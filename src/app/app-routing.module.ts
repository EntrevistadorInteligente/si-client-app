// MODULOS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/components/login/login.component';
import { PerfilComponent } from '@core/components/perfil/perfil.component';
import { RegistroComponent } from '@core/components/registro/registro.component';
import { HomeLoginComponent } from '@home/home-login/home-login.component';
import { HomeSinLoginComponent } from '@home/home-sin-login/home-sin-login.component';

// COMPONENTES
import { HomeComponent } from '@home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: HomeSinLoginComponent},
    { path: 'inicio', component: HomeLoginComponent}
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
