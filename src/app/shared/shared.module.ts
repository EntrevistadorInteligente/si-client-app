// MODULOS
import { CoreModule } from '@core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';

// COMPONENTES
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FeedbackService } from './service/feedback.service';
import { IntegradorService } from './service/integrador.service';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PanelModule,
    TabMenuModule,
    ListboxModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    PerfilComponent
  ],
  providers: [IntegradorService, FeedbackService],
})

export class SharedModule { }
