// MODULOS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES
import { HomeLoginComponent } from '@home/home-login/home-login.component';
import { HomeSinLoginComponent } from '@home/home-sin-login/home-sin-login.component';
import { HomeComponent } from '@home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeSinLoginComponent
      },
      {
        path: 'inicio',
        component: HomeLoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
