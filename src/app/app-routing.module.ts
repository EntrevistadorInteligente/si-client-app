// MODULOS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES
import { LoginComponent } from '@core/components/login/login.component';
import { RegistroComponent } from '@core/components/registro/registro.component';
import { RutasNoVisiblesGuard } from '@core/guards/rutas-no-visibles-guard.guard';
import { PerfilComponent } from '@shared/components/perfil/perfil.component';
import { ErrorComponent } from '@core/components/error/error.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./feature/inicio/landing.module").then((mod) => mod.LandingModule),
  },
  {
    path: "zona-entrevista",
    loadChildren: () =>
      import("./feature/zona-entrevista/zona-entrevista.module").then((mod) => mod.ZonaEntrevistaModule),
  },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'error', component: ErrorComponent, canActivate: [ RutasNoVisiblesGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
