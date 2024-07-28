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
import { Paso3Component } from './paso-3/paso-3.component';
import { Paso4Component } from './paso-4/paso-4.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { DividerModule } from 'primeng/divider';
import { ZonaEntrevistaRoutingModule } from '../zona-entrevista-routing.module';
import { ChatAppComponent } from './paso-3/chat/chat-app/chat-app.component';
import { UsersChatsComponent } from './paso-3/chat/chat-app/users-chats/users-chats.component';
import { VideoChatComponent } from './paso-3/chat/video-chat/video-chat.component';
import { ChatMenuComponent } from './paso-3/chat/chat-menu/chat-menu.component';
import { WaitingAreaComponent } from './waiting-area/waiting-area.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [
    MultipasosComponent,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    ChatAppComponent,
    VideoChatComponent,
    UsersChatsComponent,
    ChatMenuComponent,
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
