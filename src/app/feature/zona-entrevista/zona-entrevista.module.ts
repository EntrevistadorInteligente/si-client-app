import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ZonaEntrevistaComponent } from './zona-entrevista.component';
import { ZonaEntrevistaRoutingModule } from './zona-entrevista-routing.module';


@NgModule({
  declarations: [ZonaEntrevistaComponent],
  imports: [
    CommonModule,
    CardModule,
    InputTextareaModule,
    ButtonModule,
    PaginatorModule,
    ProgressBarModule,
    ZonaEntrevistaRoutingModule
  ],
  exports: [
    ZonaEntrevistaComponent
  ]
})
export class ZonaEntrevistaModule { }
