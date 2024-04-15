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
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


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
  providers: [],
})

export class SharedModule { }
