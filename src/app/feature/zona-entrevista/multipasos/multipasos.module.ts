import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipasosComponent } from './multipasos.component';
import { ZonaEntrevistaRoutingModule } from '@zona-entrevista/zona-entrevista-routing.module';
import { MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Paso1Component } from './paso-1/paso-1.component';
import { Paso2Component } from './paso-2/paso-2.component';
import { Paso3Component } from './paso-3/paso-3.component';
import { Paso4Component } from './paso-4/paso-4.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    MultipasosComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component
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
    NgxLoadingModule.forRoot({})
  ],

  exports: [
    MultipasosComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component
  ],
  providers: [MessageService]
})

export class MultipasosModule { }
