import { Routes } from "@angular/router"; 
import { canActivate, canActivateChild } from '../../services/guard/security.guard';
import { TermsAndConditionsComponent } from "src/app/components/terms-and-conditions/terms-and-conditions.component";

export const content: Routes = [
  {
    path: "inicio",
    loadChildren: () => import("../../../components/inicio/inicio.module").then((m) => m.InicioModule),
  },
  {
    path: "zona-entrevista",
    loadChildren: () =>
      import("../../../components/zona-entrevista/zona-entrevista.module").then((mod) => mod.ZonaEntrevistaModule),
    canActivate: [canActivate],
    canActivateChild: [canActivateChild]
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("../../../components/profile/profile.module").then((mod) => mod.ProfileModule),
    canActivate: [canActivate],
    canActivateChild: [canActivateChild]
  },
  { path: 'terminos', component: TermsAndConditionsComponent },
];
