import { Routes } from "@angular/router"; 
import { canActivate, canActivateChild } from '../../services/guard/security.guard';
import { TermsAndConditionsComponent } from "src/app/components/terms-and-conditions/terms-and-conditions.component";
import { LoginComponent } from "src/app/components/login/login.component";

export const content: Routes = [
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
  { path: 'login', component: LoginComponent },
  { path: 'terminos', component: TermsAndConditionsComponent },
];
