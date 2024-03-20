// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// COMPONENTES
import { HomeSinLoginComponent } from '@home/home-sin-login/home-sin-login.component';
import { LoginComponent } from '../core/components/login/login.component';
import { RegistroComponent } from '../core/components/registro/registro.component';
import { PerfilComponent } from '../core/components/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../feature/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class SharedRoutingModule { }
