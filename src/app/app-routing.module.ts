import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSinLoginComponent } from '@home/home-sin-login/home-sin-login.component';

const routes: Routes = [
  {
    path: 'home', component: HomeSinLoginComponent,
    loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
