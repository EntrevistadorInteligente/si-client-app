import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonaEntrevistaComponent } from './zona-entrevista.component';

const routes: Routes = [
  { path: '', component: ZonaEntrevistaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaEntrevistaRoutingModule { }
