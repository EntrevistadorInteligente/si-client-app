// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegradorService } from '../../shared/service/integrador.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

// COMPONENTES
import { HomeComponent } from './home.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { HomeSinLoginComponent } from './home-sin-login/home-sin-login.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSinLoginComponent,
    HomeLoginComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
  ],
  exports: [
    HomeComponent,
    HomeSinLoginComponent,
    HomeLoginComponent,
    LoginComponent
  ],
  providers: [IntegradorService]
})

export class HomeModule { }
