import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component';
import { DragComponent } from './components/drag/drag.component';
import { FormEmpresaComponent } from './components/form-empresa/form-empresa.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { Error404Component } from './components/error-404/error-404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/LoaderInterceptor';
import { Error403Component } from './components/error-403/error-403.component';
import { Error500Component } from './components/error-500/error-500.component';

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
    Error403Component,
    Error500Component,
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
