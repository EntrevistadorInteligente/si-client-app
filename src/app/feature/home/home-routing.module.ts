import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes } from '@angular/router';
import { HomeSinLoginComponent } from './home-sin-login/home-sin-login.component';
import { LoginComponent } from '@core/components/login/login.component';

const routes : Routes = [
  {
    path: 'home',
    component: HomeSinLoginComponent
  },
  {
    path: '',
    loadChildren: () => import('../../core/core.module').then(m => m.CoreModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HomeRoutingModule { }
