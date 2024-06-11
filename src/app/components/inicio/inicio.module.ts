import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { HomeInterviewPreviewComponent } from './home/home-interview-preview/home-interview-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InicioComponent, HomeComponent ,HomeInterviewPreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InicioRoutingModule,
    TooltipModule,
    DropdownModule,
    TabViewModule,
    ProgressSpinnerModule,
    DialogModule,
    SharedModule
  ]
})
export class InicioModule { }
