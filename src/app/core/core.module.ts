// MODULOS
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { HelpComponent } from './components/help/help.component';

// COMPONENTES
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/LoaderInterceptor';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    ContactoComponent,
    LoaderComponent,
    LoginComponent,
    RegistroComponent,
    AlertComponent,
    CarruselComponent,
    HelpComponent,
    ErrorComponent,
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
    LoginComponent,
    RegistroComponent,
    CarruselComponent,
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
