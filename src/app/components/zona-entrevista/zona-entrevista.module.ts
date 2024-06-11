import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ZonaEntrevistaComponent } from './zona-entrevista.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MultipasosModule } from './multipasos/multipasos.module';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ZonaEntrevistaComponent],
  imports: [
    CommonModule,
    CardModule,
    InputTextareaModule,
    ButtonModule,
    PaginatorModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SharedModule,
    MultipasosModule,
    DropdownModule 
  ],
  providers: [
    MessageService
  ],
})

export class ZonaEntrevistaModule { }
