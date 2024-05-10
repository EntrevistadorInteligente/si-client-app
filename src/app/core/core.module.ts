// MODULOS
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { HelpComponent } from './components/help/help.component';

// COMPONENTES
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component';
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
    RegistroComponent,
    AlertComponent,
    CarruselComponent,
    Error404Component,
    Error403Component,
    Error500Component,
    HelpComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    BadgeModule,
    ButtonModule,
    DialogModule,
  ],
  exports: [
    ContactoComponent,
    LoaderComponent,
    RegistroComponent,
    CarruselComponent,
    Error404Component,
    AlertComponent,
    HelpComponent,
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
