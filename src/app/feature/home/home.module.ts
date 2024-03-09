import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IntegradorService } from '../../shared/service/integrador.service';
import { HomeComponent } from './home.component';
import { HomeSinLoginComponent } from './home-sin-login/home-sin-login.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { MenuComponent } from './menu/menu.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    HomeComponent,
    HomeSinLoginComponent,
    HomeLoginComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    ToastModule
  ],
  providers: [IntegradorService]
})
export class HomeModule { }
