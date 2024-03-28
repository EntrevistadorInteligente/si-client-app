import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component';
import { DragComponent } from './components/drag/drag.component';
import { FormEmpresaComponent } from './components/form-empresa/form-empresa.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { Error404Component } from './components/error-404/error-404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/LoaderInterceptor';

@NgModule({
  declarations: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    AlertComponent,
    DragComponent,
    FormEmpresaComponent,
    CarruselComponent,
    Error404Component,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    AlertComponent,
    DragComponent,
    FormEmpresaComponent,
    CarruselComponent,
    Error404Component,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})

export class CoreModule { }
