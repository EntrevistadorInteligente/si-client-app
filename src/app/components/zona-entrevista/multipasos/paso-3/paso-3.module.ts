import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextoChatComponent } from './chat/text-chat/text-chat.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TextoChatComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SharedModule,
    DialogModule,
    ToastModule,
  ],
  exports: [TextoChatComponent 
  ],
})
export class Paso3Module { }
