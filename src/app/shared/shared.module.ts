// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreModule } from '@core/core.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';
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
    TabMenuModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    PerfilComponent
  ],
  providers: [IntegradorService, FeedbackService],
})

export class SharedModule { }
