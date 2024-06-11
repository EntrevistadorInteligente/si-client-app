import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "inicio",
    loadChildren: () => import("../../../components/inicio/inicio.module").then((m) => m.InicioModule),
  },
  {
    path: "zona-entrevista",
    loadChildren: () =>
      import("../../../components/zona-entrevista/zona-entrevista.module").then((mod) => mod.ZonaEntrevistaModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("../../../components/profile/profile.module").then((mod) => mod.ProfileModule),
  }
];
