import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { CoreModule } from '@core/core.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  declarations: [
    LandingComponent,
    HomeLoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    LandingRoutingModule
  ],
  exports: [
    LandingComponent,
    HomeLoginComponent,
    HomeComponent,
  ]
})

export class LandingModule { }
