// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { HomeComponent } from './home.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { HomeSinLoginComponent } from './home-sin-login/home-sin-login.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSinLoginComponent,
    HomeLoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    HomeSinLoginComponent,
    HomeLoginComponent
  ]
})

export class HomeModule { }
