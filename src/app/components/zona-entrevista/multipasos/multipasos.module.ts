import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipasosComponent } from './multipasos.component';
import { MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Paso2Component } from './paso-2/paso-2.component';
import { Paso4Component } from './paso-4/paso-4.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { DividerModule } from 'primeng/divider';
import { ZonaEntrevistaRoutingModule } from '../zona-entrevista-routing.module';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Paso3Module } from './paso-3/paso-3.module';
import { Paso3Component } from './paso-3/paso-3.component';
@NgModule({
  declarations: [
    MultipasosComponent,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    WaitingAreaComponent,
  ],

  imports: [
    CommonModule,
    CardModule,
    InputTextareaModule,
    ButtonModule,
    PaginatorModule,
    ProgressBarModule,
    ZonaEntrevistaRoutingModule,
    DialogModule,
    ToastModule,
    SharedModule,
    TooltipModule,
    ReactiveFormsModule,
    StepsModule,
    FieldsetModule,
    InputTextModule,
    StepperModule,
    DividerModule,
    CarouselModule,
    CollapseModule.forRoot(),
    Paso3Module
  ],

  exports: [
    MultipasosComponent,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    WaitingAreaComponent,
  ],
  providers: [MessageService],
})
export class MultipasosModule {}
