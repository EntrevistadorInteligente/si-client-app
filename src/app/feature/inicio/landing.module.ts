import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { CoreModule } from '@core/core.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { HomeInterviewPreviewComponent } from './home-interview-preview/home-interview-preview.component';

@NgModule({
  declarations: [LandingComponent, HomeLoginComponent, HomeComponent, HomeInterviewPreviewComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    LandingRoutingModule,
    TooltipModule,
    SharedModule,
    DropdownModule,
    TabViewModule,
    FormsModule,
    SharedModule,
    ProgressSpinnerModule,
    DialogModule,
  ],
  exports: [LandingComponent, HomeLoginComponent, HomeComponent],
})
export class LandingModule {}
