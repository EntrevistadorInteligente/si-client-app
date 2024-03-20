import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component';
import { Routes } from '@angular/router';
import { DragComponent } from './components/drag/drag.component';

const routes : Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent }
]

@NgModule({
  declarations: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    AlertComponent,
    DragComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    AlertComponent,
    DragComponent,
  ],
})

export class CoreModule { }
