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
  providers: [],
})

export class SharedModule { }
